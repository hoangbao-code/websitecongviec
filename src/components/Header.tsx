import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const isSubPage = location.pathname !== '/';

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 mt-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-between glass p-3 px-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-6">
          {isSubPage && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold py-1.5 px-3 rounded-lg border border-stone-200 transition-colors hover:bg-stone-200"
              aria-label="Go back"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          )}
          <div
            className="cursor-pointer font-serif text-2xl font-bold tracking-tight text-rose-900"
            onClick={() => navigate('/')}
          >
            NAILED<span className="font-light italic">artistry</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#2D2424]">
          <a href="/#courses" className="hover:text-rose-900 transition-colors">Courses</a>
          <a href="/#testimonials" className="hover:text-rose-900 transition-colors">Testimonials</a>
          <a href="/#faq" className="hover:text-rose-900 transition-colors">FAQ</a>
          
          <div className="w-px h-4 bg-stone-300 mx-2"></div>
          
          {user ? (
            <>
              {role === 'admin' && (
                <button onClick={() => navigate('/admin')} className="text-yellow-700 hover:text-yellow-800 transition-colors">
                  Admin
                </button>
              )}
              <button onClick={() => navigate('/portal')} className="text-rose-900 font-bold hover:text-rose-800 transition-colors">
                Portal
              </button>
              <button onClick={logout} className="ml-2 hover:text-rose-900 border border-stone-200 px-3 py-1.5 rounded-lg transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="hover:text-rose-900 transition-colors">
                Login
              </button>
              <button onClick={() => navigate('/signup')} className="ml-2 bg-rose-900 text-white px-4 py-1.5 rounded-lg hover:bg-rose-800 transition-colors">
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
