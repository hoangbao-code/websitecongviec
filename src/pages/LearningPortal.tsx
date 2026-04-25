import { useEffect, useState, FormEvent } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { COURSES } from '../lib/data';

export function LearningPortal() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Activation Code State
  const [activationCode, setActivationCode] = useState('');
  const [activating, setActivating] = useState(false);
  const [activationMsg, setActivationMsg] = useState('');

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const snapshots = await getDocs(q);
      const data = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleActivate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !activationCode.trim()) return;
    setActivating(true);
    setActivationMsg('');

    try {
      // 1. Fetch the activation code securely from Firestore using query
      const codeStr = activationCode.trim();
      const codeQuery = query(collection(db, 'activation_codes'), where('code', '==', codeStr));
      const codeSnapshots = await getDocs(codeQuery);

      if (codeSnapshots.empty) {
        throw new Error("Invalid or unfound activation code.");
      }

      const codeDoc = codeSnapshots.docs[0];
      const codeData = codeDoc.data();

      // Check if unused
      if (codeData.isUsed) {
        throw new Error("Activation code has already been used.");
      }

      const course = COURSES.find(c => c.id === codeData.courseId);
      if (!course) throw new Error("Course tied to this code not found.");

      // Check if user already has course
      if (orders.find(o => o.courseId === course.id && o.status === 'active')) {
        throw new Error("You are already enrolled in this course!");
      }

      // 2. Perform batched logical operations natively
      // Update code
      await updateDoc(doc(db, 'activation_codes', codeDoc.id), {
        isUsed: true,
        usedBy: user.uid,
        usedAt: Date.now()
      });

      // Insert Order
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        courseId: course.id,
        courseTitle: course.title,
        status: 'active',
        transactionRef: `ActivationCode-${codeDoc.id}`,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      setActivationMsg('Success! Course activated.');
      setActivationCode('');
      await fetchOrders(); // refresh
    } catch (err: any) {
      console.error(err);
      setActivationMsg(`Error: ${err.message}`);
    } finally {
      setActivating(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-stone-500">Loading your courses...</div>;

  if (!user) {
    return (
      <div className="p-12 text-center text-stone-500">
        Please log in to access your Learning Portal.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif font-bold text-rose-900 mb-8">My Learning Portal</h1>
      
      {/* Activation Section */}
      <div className="glass p-8 rounded-3xl mb-8 flex flex-col md:flex-row gap-8 items-center border border-stone-200 bg-white">
        <div className="flex-1">
          <h2 className="text-xl font-serif font-bold text-stone-800 mb-2">Activate a Course</h2>
          <p className="text-sm text-stone-600">Got an access code from the Admin? Enter it below to unlock your course immediately.</p>
        </div>
        <div className="w-full md:w-auto flex-1 max-w-md">
          <form onSubmit={handleActivate} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="ACT-XXXX-XXXX" 
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 bg-stone-50 uppercase font-mono"
              />
              <button 
                type="submit"
                disabled={activating || !activationCode}
                className="bg-rose-900 text-white rounded-xl px-6 py-2.5 font-semibold hover:bg-rose-800 transition disabled:opacity-50"
              >
                {activating ? '...' : 'Activate'}
              </button>
            </div>
            {activationMsg && (
              <p className={`text-xs font-bold px-2 ${activationMsg.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
                {activationMsg}
              </p>
            )}
          </form>
        </div>
      </div>

      <h2 className="text-xl font-serif font-bold text-stone-800 mb-6">Enrolled Courses</h2>
      {orders.length === 0 ? (
        <div className="glass p-12 rounded-3xl text-center">
          <p className="text-stone-600 mb-6">You haven't activated any courses yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-rose-900 text-white rounded-full px-6 py-2 font-semibold hover:bg-rose-800 transition"
          >
            Explore Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order.id} className="glass p-6 rounded-3xl flex flex-col h-full bg-white">
              <h3 className="font-bold text-stone-800 text-lg mb-2 leading-tight">{order.courseTitle}</h3>
              <div className="mb-4">
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${
                  order.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-auto pt-4 border-t border-stone-100">
                {order.status === 'active' ? (
                  <button 
                    onClick={() => navigate(`/player/${order.courseId}`)}
                    className="w-full bg-rose-900 text-white rounded-full py-2 font-semibold text-sm hover:bg-rose-800 transition shadow-sm"
                  >
                    Watch Lessons
                  </button>
                ) : (
                  <p className="text-xs text-stone-500 text-center">
                    Reviewing payment.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
