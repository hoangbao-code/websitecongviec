export interface Module {
  title: string;
  lessons: string[];
}

export interface Course {
  id: string;
  title: string;
  price: number;
  duration: string;
  skillLevel: string;
  description: string;
  instructor: {
    avatar: string;
    name: string;
    title: string;
    bio: string;
  };
  image: string;
  syllabus: Module[];
}

export const INSTRUCTOR = {
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
  name: "Elena Nguyen",
  title: "Master Nail Artist & Educator",
  bio: "Elena is a Master Nail Artist & Educator with over 10 years of international salon experience. She has trained hundreds of students to achieve their dreams in the nail art industry."
};

export const COURSES: Course[] = [
  {
    id: "basic-gel",
    title: "Basic Gel & Manicure Fundamentals",
    price: 99,
    duration: "4 Weeks",
    skillLevel: "Beginner",
    description: "Perfect for beginners. Learn the absolute basics of nail care and gel polish.",
    instructor: INSTRUCTOR,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800&h=500",
    syllabus: [
      {
        title: "Module 1: Nail Anatomy & Prep",
        lessons: ["Understanding Nail Structure", "Sanitation & Hygiene", "Cuticle Care Basics", "Shaping the Natural Nail"]
      },
      {
        title: "Module 2: Perfect Gel Polish Application",
        lessons: ["Base Coat Application", "Color Theory for Nails", "Flawless Color Painting", "Top Coat Sealing"]
      },
      {
        title: "Module 3: Simple & Elegant Nail Art",
        lessons: ["French Manicure Techniques", "Basic Dots & Lines", "Applying Foils & Flakes", "Troubleshooting Common Issues"]
      }
    ]
  },
  {
    id: "advanced-3d",
    title: "Advanced 3D Acrylic & Character Art",
    price: 149,
    duration: "6 Weeks",
    skillLevel: "Advanced",
    description: "Master complex sculpting, 3D designs, and character drawing.",
    instructor: INSTRUCTOR,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800&h=500",
    syllabus: [
      {
        title: "Module 1: Acrylic Shaping Mastery",
        lessons: ["Powder to Liquid Ratio", "Building the Apex", "Filing and Perfecting Shapes", "E-file Techniques"]
      },
      {
        title: "Module 2: 3D Flower Sculpting",
        lessons: ["Basic Petal Shapes", "Layering Roses", "Creating Leaves & Vines", "Combining Elements"]
      },
      {
        title: "Module 3: Micro-Painting & Characters",
        lessons: ["Brush Selection & Handling", "Sketching Ratios", "Painting Disney Characters", "Shadows & Highlights"]
      }
    ]
  },
  {
    id: "salon-business",
    title: "Professional Nail Salon Business",
    price: 199,
    duration: "3 Weeks",
    skillLevel: "All Levels",
    description: "Learn how to manage clients, take professional photos, and build your brand.",
    instructor: INSTRUCTOR,
    image: "https://images.unsplash.com/photo-1516975080661-46bbf692f8ef?auto=format&fit=crop&q=80&w=800&h=500",
    syllabus: [
      {
        title: "Module 1: Speed & Efficiency Techniques",
        lessons: ["Time Management at the Desk", "Product Tracking", "Reducing Application Time", "Ergonomics"]
      },
      {
        title: "Module 2: Photography & Social Media",
        lessons: ["Lighting & Hand Posing", "Editing Basics", "Instagram Growth Strategies", "Creating Viral Reels"]
      },
      {
        title: "Module 3: Customer Retention",
        lessons: ["Client Communication", "Handling Complaints", "Loyalty Programs", "Pricing Your Services correctly"]
      }
    ]
  }
];

export const FAQS = [
  {
    question: "Do I need previous experience to join?",
    answer: "Not for all courses! Our 'Basic Gel & Manicure Fundamentals' expects zero experience. However, the 'Advanced 3D Acrylic' course requires a solid foundation in acrylic application."
  },
  {
    question: "How long do I have access to the course materials?",
    answer: "You will have lifetime access to the course materials, including all future updates to the curriculum."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple/Google Pay."
  },
  {
    question: "Do I get a certificate upon completion?",
    answer: "Yes, you will receive a digital certificate of completion for every course you finish, which you can print or display on your social media."
  }
];

export const STUDENTS_WORK = [
  "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1627931448881-432845ac5e4d?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1595868652395-654cb6531393?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1516975080661-4613bb0414cbs?auto=format&fit=crop&q=80&w=600&h=600", // Will fallback or use valid
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?auto=format&fit=crop&q=80&w=600&h=600"
];

export const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    quote: "Elena's course transformed the way I approach nail art. The 3D sculpting module is incredible. My client list is fully booked for months!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Mia Tran",
    quote: "As a beginner, I was so intimidated. The basic gel course breaks everything down so simply. The videos are high quality and easy to follow.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Jessica Rivera",
    quote: "The business course taught me how to actually price myself. I was severely undercharging before, and now I make 2x more working the same hours.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  }
];
