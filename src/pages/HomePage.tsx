import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { COURSES, FAQS, STUDENTS_WORK, TESTIMONIALS } from '../lib/data';
import { Accordion } from '../components/Accordion';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-rose-900 px-6 py-24 sm:py-32 lg:px-8 mt-4 mx-4 sm:mx-6 lg:mx-8 rounded-3xl m-auto max-w-7xl">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1595868652395-654cb6531393?auto=format&fit=crop&q=80&w=2000&h=1000"
              alt="Nail art background"
              className="h-full w-full object-cover grayscale"
            />
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Master the Art of Nails
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-rose-100"
            >
              Join thousands of students learning professional nail art techniques from industry experts. Start your journey today.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <a
                href="#courses"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-rose-900 shadow-sm transition-transform hover:scale-105"
              >
                Explore Courses
              </a>
            </motion.div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-rose-900 sm:text-4xl">Featured Courses</h2>
            <p className="mt-4 text-stone-600">Choose the perfect course for your skill level.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-3xl glass p-4 transition-all hover:bg-white/90"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl mb-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-rose-100/90 backdrop-blur text-rose-800 text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-sm">
                      {course.duration}
                    </span>
                    <span className="bg-stone-100/90 backdrop-blur text-stone-600 text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-sm">
                      {course.skillLevel}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-2">
                  <div>
                    <h3 className="font-serif text-2xl font-bold leading-tight mb-2 text-[#2D2424]">{course.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-stone-500 leading-relaxed">{course.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-end">
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="flex items-center gap-1 text-sm font-semibold text-rose-900 transition-colors hover:text-rose-700 uppercase tracking-widest text-[10px]"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Outstanding Students (Masonry-ish Grid) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-rose-900 sm:text-4xl">Student Gallery</h2>
            <p className="mt-4 text-stone-600">Incredible work created by our talented students.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {STUDENTS_WORK.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-stone-100",
                  i === 0 || i === 3 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                )}
              >
                <img src={image} alt={`Student work ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="px-4 py-24 sm:px-6 lg:px-8 max-w-7xl mx-auto glass my-12 rounded-[3rem]">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-rose-900 sm:text-4xl">Loved by Students</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="mt-auto p-8 bg-rose-900 text-rose-50 rounded-3xl italic relative shadow-sm"
              >
                <span className="absolute -top-4 -left-2 text-6xl opacity-20 font-serif text-white">"</span>
                <p className="text-sm relative z-10 leading-relaxed text-rose-100">"{testimonial.quote}"</p>
                
                <div className="mt-6 pt-4 border-t border-rose-800/50 flex items-center gap-4 not-italic">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-widest">{testimonial.name}</h4>
                    <p className="text-[10px] text-rose-300 uppercase tracking-widest mt-1">Certified Student</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-rose-900 sm:text-4xl">Common Questions</h2>
          </div>
          <Accordion
            items={FAQS.map(faq => ({
              title: faq.question,
              content: <p className="leading-relaxed">{faq.answer}</p>
            }))}
          />
        </section>
      </main>
    </div>
  );
}

// Utility function duplicated here for ease or can be imported if extracted
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
