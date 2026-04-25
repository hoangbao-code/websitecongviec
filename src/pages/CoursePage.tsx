import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, GraduationCap, Users } from 'lucide-react';
import { COURSES } from '../lib/data';
import { Accordion } from '../components/Accordion';

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl text-stone-500">Course not found.</h2>
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      {/* Course Hero */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-rose-900 mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-3xl max-w-7xl xl:mx-auto">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-rose-900/40" />
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 lg:px-16 pb-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 backdrop-blur-md">
                <span className="text-xs font-bold text-white tracking-widest uppercase">{course.skillLevel}</span>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {course.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
          
          {/* Main Content */}
          <div className="space-y-16 lg:col-span-2">
            
            {/* Overview */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-rose-900 mb-6">Course Overview</h2>
              <p className="text-lg leading-relaxed text-stone-600">{course.description}</p>
              
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 border-y border-stone-200 py-8">
                <div className="flex items-center gap-3 text-stone-600">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Duration</p>
                    <p className="font-semibold text-stone-900">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <GraduationCap className="h-5 w-5 text-rose-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Skill Level</p>
                    <p className="font-semibold text-stone-900">{course.skillLevel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-stone-600">
                  <Users className="h-5 w-5 text-rose-400" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Access</p>
                    <p className="font-semibold text-stone-900">Lifetime</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Syllabus */}
            <section className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-rose-900 mb-8">Course Syllabus / Roadmap</h2>
              <Accordion
                items={course.syllabus.map(module => ({
                  title: module.title,
                  content: (
                    <ul className="mt-2 space-y-3">
                      {module.lessons.map((lesson, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }))}
              />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-1">
            <div className="sticky top-28 glass rounded-3xl p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-rose-900 mb-6">Your Instructor</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-stone-100"
                />
                <div>
                  <p className="font-semibold text-stone-900">{course.instructor.name}</p>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">{course.instructor.title}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-stone-600 mb-8">{course.instructor.bio}</p>
              
              <button 
                onClick={() => navigate(`/checkout/${course.id}`)}
                className="w-full rounded-full bg-rose-900 py-3.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-900"
              >
                Enroll Now • ${course.price}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
