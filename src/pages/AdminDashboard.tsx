import { useEffect, useState, FormEvent } from 'react';
import { collection, query, getDocs, updateDoc, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../lib/data';

export function AdminDashboard() {
  const { role } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [activationCodes, setActivationCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Code Gen State
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0].id);
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState('');

  useEffect(() => {
    if (role !== 'admin') {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Orders
        const qOrders = query(collection(db, 'orders'));
        const snapshots = await getDocs(qOrders);
        const data: any[] = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(data);

        // Fetch Activation Codes
        const qCodes = query(collection(db, 'activation_codes'));
        const snapshotsCodes = await getDocs(qCodes);
        const codesData: any[] = snapshotsCodes.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        codesData.sort((a, b) => b.createdAt - a.createdAt);
        setActivationCodes(codesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [role]);

  const handleGenerateCode = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateMsg('');
    
    try {
      // Generate a random code: ACT-XXXX-XXXX
      const r = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const newCode = `ACT-${r()}-${r()}`;
      
      const course = COURSES.find(c => c.id === selectedCourse);

      const codeRef = await addDoc(collection(db, 'activation_codes'), {
        code: newCode,
        courseId: selectedCourse,
        isUsed: false,
        createdAt: Date.now()
      });

      // Update UI List
      const newCodeObj = { id: codeRef.id, code: newCode, courseId: selectedCourse, isUsed: false, createdAt: Date.now() };
      setActivationCodes([newCodeObj, ...activationCodes]);
      
      setCreateMsg(`Generated: ${newCode} for ${course?.title}`);
    } catch (err: any) {
      console.error(err);
      setCreateMsg('Error: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleApprove = async (orderId: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'active',
        updatedAt: Date.now()
      });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'active' } : o));
    } catch (err) {
      console.error(err);
      alert('Failed to update order status');
    }
  };

  if (loading) return <div className="p-12 text-center text-stone-500">Loading admin dashboard...</div>;

  if (role !== 'admin') {
    return (
      <div className="p-12 text-center text-rose-900 font-bold">
        Unauthorized. Admin access required.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold text-rose-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Create Code Form */}
        <div className="lg:col-span-1 glass p-6 rounded-3xl h-fit">
          <h2 className="text-lg font-serif font-bold text-stone-800 mb-6">Generate Activation Code</h2>
          
          {createMsg && (
            <div className={`p-3 mb-4 text-sm rounded-lg border ${createMsg.startsWith('Error') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
              <p className="font-bold">{createMsg}</p>
            </div>
          )}

          <form onSubmit={handleGenerateCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-stone-500 mb-1">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-1 focus:ring-rose-300 bg-white"
              >
                {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="w-full bg-rose-900 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-rose-800 transition disabled:opacity-50"
            >
              {creating ? 'Generating...' : 'Generate Access Code'}
            </button>
          </form>
        </div>

        {/* Existing Codes */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl bg-white overflow-hidden">
          <h2 className="text-lg font-serif font-bold text-stone-800 mb-6">Activation Codes List</h2>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-[10px] uppercase font-bold text-stone-500 border-b border-stone-200 sticky top-0">
                <tr>
                  <th className="py-2 px-4 font-bold">Date</th>
                  <th className="py-2 px-4 font-bold">Code</th>
                  <th className="py-2 px-4 font-bold">Course ID</th>
                  <th className="py-2 px-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {activationCodes.map(code => (
                  <tr key={code.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-2 px-4 text-xs">{new Date(code.createdAt).toLocaleString()}</td>
                    <td className="py-2 px-4 font-mono font-bold text-rose-900">{code.code}</td>
                    <td className="py-2 px-4 text-xs">{code.courseId}</td>
                    <td className="py-2 px-4">
                      {code.isUsed ? (
                        <span className="text-red-600 text-[10px] font-bold uppercase">Used</span>
                      ) : (
                        <span className="text-green-600 text-[10px] font-bold uppercase">Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl overflow-hidden bg-white mt-8">
        <h2 className="text-xl font-serif font-bold text-stone-800 mb-6">Enrolled Students / Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-xs uppercase font-bold text-stone-500 border-b border-stone-200">
              <tr>
                <th className="py-4 px-4 font-bold">Date</th>
                <th className="py-4 px-4 font-bold">User Email</th>
                <th className="py-4 px-4 font-bold">Course</th>
                <th className="py-4 px-4 font-bold">Trx Ref</th>
                <th className="py-4 px-4 font-bold">Status</th>
                <th className="py-4 px-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4 font-semibold text-stone-800">{order.userEmail}</td>
                  <td className="py-4 px-4">{order.courseTitle}</td>
                  <td className="py-4 px-4 font-mono text-xs">{order.transactionRef}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleApprove(order.id)}
                        className="bg-rose-900 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg hover:bg-rose-800 shadow-sm transition"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-500 italic">No access records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
