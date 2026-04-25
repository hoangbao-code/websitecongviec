import { useParams, useNavigate } from 'react-router-dom';
import { COURSES } from '../lib/data';

export function CheckoutPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const course = COURSES.find(c => c.id === courseId);

  if (!course) return <div className="p-8 text-center">Course not found.</div>;

  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Summary */}
        <div className="glass p-6 rounded-3xl">
          <h2 className="text-xl font-bold font-serif text-rose-900 mb-6">Order Summary</h2>
          <div className="flex gap-4 mb-6">
            <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded-xl" />
            <div>
              <h3 className="font-bold text-stone-800 leading-tight mb-2">{course.title}</h3>
              <p className="text-sm text-stone-500">Instructor: {course.instructor.name}</p>
              <p className="text-lg font-bold text-rose-900 mt-2">${course.price} USD</p>
            </div>
          </div>
          <div className="border-t border-stone-200 pt-4 flex justify-between font-bold text-stone-800">
            <span>Total</span>
            <span>${course.price} USD</span>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="glass p-6 rounded-3xl text-center">
          <h2 className="text-xl font-bold font-serif text-rose-900 mb-6">Manual Payment</h2>
          
          <div className="bg-white p-4 rounded-3xl inline-block mx-auto mb-6 border border-stone-200">
            {/* Placeholder QR Code for Wise / Payoneer */}
            <div className="w-48 h-48 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
              [ QR Code ]
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl mb-8 text-left">
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              Please transfer exactly <strong className="text-rose-900">${course.price} USD</strong>. Include your Email as the transfer note.
            </p>
            <div className="space-y-2 text-sm font-mono bg-white p-3 rounded-lg border border-stone-200">
              <div className="flex justify-between">
                <span className="text-stone-500">Bank Name:</span>
                <span className="font-bold">Wise Europe Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Account No:</span>
                <span className="font-bold">4892 1042 8493</span>
              </div>
            </div>
          </div>

          <a 
            href="https://m.me/yourfanpage" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full block bg-[#0084FF] text-white rounded-full py-3.5 font-semibold hover:bg-blue-600 transition shadow-sm"
          >
            I have paid - Contact Fanpage
          </a>
          <p className="text-xs text-stone-500 mt-4">
            After confirming payment, the Admin will provide you with login credentials to access the course.
          </p>
        </div>
      </div>
    </div>
  );
}
