import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../lib/data';

export function VideoPlayerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const course = COURSES.find(c => c.id === courseId);

  useEffect(() => {
    if (!user || !courseId) {
      setLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        const q = query(
          collection(db, 'orders'), 
          where('userId', '==', user.uid),
          where('courseId', '==', courseId),
          where('status', '==', 'active')
        );
        const snapshots = await getDocs(q);
        if (!snapshots.empty) {
          setHasAccess(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkAccess();
  }, [user, courseId]);

  if (loading) return <div className="p-12 text-center text-stone-500">Verifying access...</div>;

  if (!user || !hasAccess || !course) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-bold font-serif text-rose-900 mb-4">Access Denied</h2>
        <p className="text-stone-600 mb-6">You do not have active access to this course.</p>
        <button 
          onClick={() => navigate('/portal')}
          className="bg-rose-900 text-white rounded-full px-6 py-2 font-semibold hover:bg-rose-800 transition"
        >
          Back to Portal
        </button>
      </div>
    );
  }

  // Example Google Drive embedding format
  const mockDriveVideo = "https://drive.google.com/file/d/1Xy_placeholder_abc123/preview";

  return (
    <div className="mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/portal')}
          className="text-stone-500 hover:text-stone-900 flex items-center gap-2 text-sm font-semibold"
        >
          &larr; Back to Portal
        </button>
        <h1 className="text-2xl font-serif font-bold text-rose-900 ml-auto">{course.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Area */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-lg relative">
            <iframe 
              src={mockDriveVideo} 
              className="absolute top-0 left-0 w-full h-full border-none"
              allow="autoplay"
              allowFullScreen
              title="Course Video"
            ></iframe>
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900 text-stone-400">
              {/* Fallback text if iframe fails to load or while developing */}
              <p>Google Drive Video Embed ({course.title} Lesson)</p>
            </div>
          </div>
          <h2 className="text-xl font-bold font-serif text-rose-900 mt-6 mb-2">Module 1: Introduction</h2>
          <p className="text-stone-600">Welcome to the first lesson. Please make sure to follow along and practice the techniques demonstrated here.</p>
        </div>

        {/* Course Playlist Sidebar */}
        <div className="glass p-6 rounded-3xl h-fit">
          <h3 className="font-bold font-serif text-lg text-stone-800 mb-4">Course Content</h3>
          <div className="space-y-4">
            {course.syllabus.map((module, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-bold text-xs uppercase tracking-widest text-stone-500 mb-2">{module.title}</h4>
                <div className="space-y-2">
                  {module.lessons.map((lesson, j) => (
                    <button 
                      key={j}
                      className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                        i === 0 && j === 0 ? 'bg-rose-100/50 text-rose-900 font-semibold border border-rose-200' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {lesson}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
