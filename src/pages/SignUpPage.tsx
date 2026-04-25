import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, role } = useAuth();

  // Smart Routing
  useEffect(() => {
    if (user && role) {
      if (role === 'admin') navigate('/admin');
      else navigate('/portal');
    }
  }, [user, role, navigate]);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User doc creation is handled by AuthContext listener
      // Routing handled by useEffect
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account.');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-24 px-4 sm:px-6 lg:px-8">
      <div className="glass p-8 rounded-3xl text-center">
        <h2 className="text-2xl font-serif font-bold text-rose-900 mb-2">Create Account</h2>
        <p className="text-sm text-stone-600 mb-8">Sign up to access your courses.</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
              placeholder="At least 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-900 text-white rounded-full py-3.5 mt-4 font-semibold hover:bg-rose-800 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-sm text-stone-500 mt-6">
          Already have an account? <a href="/login" className="text-rose-900 font-bold hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
