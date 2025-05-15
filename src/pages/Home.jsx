import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SignInModal from '../components/SignInModal';
import { signInWithGoogle, signInWithGitHub } from '../firebase/firebase';

const features = [
  { title: 'Track Applications', description: 'Stay on top of your job search journey with clean and structured application tracking.' },
  { title: 'Kanban + Timeline Views', description: 'Visualize your progress and status easily using intuitive views that boost productivity.' },
  { title: 'Add Notes & Hashtags', description: 'Customize each job card with personal notes and hashtags to stay organized.' },
];

const faqs = [
  { question: 'How does Job Tracker work?', answer: 'Sign in, start adding jobs, and organize them by stage. Update status as you move forward!' },
  { question: 'Do I need an account?', answer: 'Yes, simply sign in with Google or GitHub to securely track your applications.' },
  { question: 'Is my data safe?', answer: 'Yes, your data is stored securely with Firebase and only accessible to you.' },
];

const testimonials = [
  { name: 'Ananya Sinha', title: 'Frontend Developer', quote: 'Job Tracker helped me stay organized and less stressed. Absolutely love it!', avatar: 'https://ui-avatars.com/api/?name=Ananya+Sinha&background=0D8ABC&color=fff' },
  { name: 'Ravi Sharma', title: 'Software Engineer', quote: 'The visuals and animations make tracking jobs actually fun!', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Priya Desai', title: 'UX Designer', quote: 'Sleek, fast, and very intuitive. Perfect for job seekers.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

const timelineSteps = [
  'Sign in securely with Google or GitHub.',
  'Start adding your job applications.',
  'Track every stage from Applied to Offer.',
  'Visualize progress with Kanban and Timeline views.',
  'Stay organized with notes, hashtags, and filters.',
];

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [jobCount, setJobCount] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleGetStarted = () => setIsSignInModalOpen(true);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    setIsSignInModalOpen(false);
  };

  const handleGitHubSignIn = async () => {
    await signInWithGitHub();
    setIsSignInModalOpen(false);
  };

  useEffect(() => {
    let count = 0;
    const target = 8981;
    const interval = setInterval(() => {
      count += Math.ceil((target - count) / 8);
      setJobCount(count);
      if (count >= target) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="mt-8 pt-20 px-6 max-w-7xl mx-auto relative">
      {/* Scroll Progress Bar */}
      <motion.div style={{ width }} className="h-1 bg-primary fixed top-0 left-0 right-0 z-50" />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Welcome to Job Application Tracker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Simplify your job search journey. Track all your applications, interviews, and offers in one place.
        </p>
        <div className="text-2xl font-semibold text-primary">
          🚀 {jobCount.toLocaleString()}+ jobs tracked
        </div>
        <motion.button
          onClick={handleGetStarted}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg transition border ${isDark
            ? 'bg-white text-black border-black'
            : 'bg-primary text-primary-foreground border-transparent'
          } hover:opacity-90`}
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-28">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-card border p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works – Visual Demo</h2>
        <div className="relative border-l-4 border-primary pl-6 space-y-8">
          {timelineSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-[-36px] top-1 w-4 h-4 rounded-full bg-primary" />
              <p className="text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQs</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-muted p-4 rounded-lg border"
            >
              <h4 className="font-semibold">{faq.question}</h4>
              <p className="text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold mb-10 text-center">What users are saying</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-card border p-6 rounded-xl shadow-md text-center"
            >
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
              <p className="text-muted-foreground mb-2 italic">“{t.quote}”</p>
              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-sm text-muted-foreground">{t.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter/Blog Preview */}
      <section className="mb-28 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Get Tips & Insights</h2>
        <p className="text-muted-foreground mb-6">
          Subscribe to our blog for job search tips, portfolio hacks, and growth strategies.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-600 outline-none w-2/3 max-w-xs"
          />
          <button className="px-4 py-3 bg-white text-black rounded-r-lg hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="text-center mb-24 bg-primary text-primary-foreground p-10 rounded-xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your job hunt?</h2>
        <p className="mb-6">Start tracking applications, interviews, and offers with ease.</p>
        <motion.button
  onClick={handleGetStarted}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 rounded-lg border
             bg-white text-black border-black
             dark:bg-black dark:text-white dark:border-white
             hover:opacity-90 transition"
>
  Get Started
</motion.button>

      </motion.section>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGitHubSignIn}
        isDark={isDark}
      />
    </div>
  );
}
