import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  LayoutGrid,
  Clock,
  Database,
  Lock,
  Users,
  Server,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

import SignInModal from '../components/SignInModal';
import { signInWithGoogle, signInWithGitHub } from '../firebase/firebase';

const SECTION_HEADING =
  'text-3xl font-bold tracking-wide text-center';

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const openSignIn = () => setIsSignInModalOpen(true);

  return (
    <div ref={containerRef} className="relative">
      {/* Scroll Progress */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-1 bg-primary z-50"
      />

      {/* ================= HERO ================= */}
      <section className="pt-36 pb-28 px-6 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          JOB APPLICATION TRACKER
        </motion.h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          A focused tool to organize real job applications without spreadsheets,
          chaos, or unreliable browser storage.
        </p>

        <div className="mt-10 flex justify-center">
          <button
            onClick={openSignIn}
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition"
          >
            START TRACKING
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-32 text-center">
        <h2 className={`${SECTION_HEADING} mb-8`}>
          THE PROBLEM THIS SOLVES
        </h2>

        <div className="border rounded-2xl bg-card p-8 space-y-4 text-muted-foreground">
          <p>• Job applications scattered across portals and spreadsheets</p>
          <p>• No clear visibility into progress or momentum</p>
          <p>• Browser storage breaking with large datasets</p>
          <p>• No structured way to reflect on outcomes</p>
        </div>
      </section>

      {/* ================= BUILT FOR REAL USAGE ================= */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          BUILT FOR REAL USAGE
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="border rounded-xl p-6 bg-card">
            <Users className="mx-auto mb-3 text-primary" />
            <p className="font-semibold">REAL USERS</p>
            <p className="text-sm text-muted-foreground">
              Actively storing job data in Firestore
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-card">
            <Server className="mx-auto mb-3 text-primary" />
            <p className="font-semibold">CLOUD-BACKED</p>
            <p className="text-sm text-muted-foreground">
              No dependency on browser or device storage
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-card">
            <ShieldCheck className="mx-auto mb-3 text-primary" />
            <p className="font-semibold">PRIVATE BY DESIGN</p>
            <p className="text-sm text-muted-foreground">
              Each user sees only their own data
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISUAL JOB TRACKING ================= */}
      <section className="px-6 max-w-7xl mx-auto mb-36">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          VISUAL JOB TRACKING
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              title: 'WISHLIST',
              jobs: [{ company: 'Stripe', role: 'Frontend Engineer', location: 'Remote' }],
            },
            {
              title: 'APPLIED',
              jobs: [
                { company: 'Google', role: 'Software Engineer', location: 'Bangalore' },
                { company: 'Swiggy', role: 'Frontend Developer', location: 'Remote' },
              ],
            },
            {
              title: 'INTERVIEW',
              jobs: [{ company: 'Razorpay', role: 'SDE-1', location: 'Bangalore' }],
            },
            {
              title: 'OFFER',
              jobs: [{ company: 'Startup X', role: 'React Developer', location: 'Remote' }],
            },
            {
              title: 'REJECTED',
              jobs: [{ company: 'Company Y', role: 'UI Engineer', location: 'Mumbai' }],
            },
          ].map((column) => (
            <div
              key={column.title}
              className="bg-card border rounded-xl p-4 space-y-4"
            >
              <p className="text-xs font-semibold tracking-wide text-center text-muted-foreground">
                {column.title}
              </p>

              {column.jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border bg-background p-3 shadow-sm"
                >
                  <p className="font-medium text-sm">{job.company}</p>
                  <p className="text-xs text-muted-foreground">{job.role}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    📍 {job.location}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Static preview of how applications are organized visually.
        </p>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-32">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          HOW IT WORKS
        </h2>

        <div className="space-y-6">
          {[
            'Sign in securely using Google or GitHub',
            'Add job applications with company, role, location, and date',
            'Move applications across stages as progress changes',
            'Search and filter as the list grows',
            'Maintain clarity throughout the job hunt',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                {i + 1}
              </div>
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CORE FEATURES ================= */}
      <section className="px-6 max-w-6xl mx-auto mb-36">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          CORE FEATURES
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: LayoutGrid,
              title: 'KANBAN TRACKING',
              desc: 'Clearly defined stages from Wishlist to Offer.',
            },
            {
              icon: Clock,
              title: 'TIMELINE VIEW',
              desc: 'Chronological visibility of your job search.',
            },
            {
              icon: Database,
              title: 'CLOUD STORAGE',
              desc: 'Data safely stored in Firestore.',
            },
            {
              icon: Lock,
              title: 'PRIVATE BY DESIGN',
              desc: 'User-scoped authentication and access.',
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-card border rounded-xl p-6">
                <Icon className="text-primary mb-4" size={26} />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            START TRACKING APPLICATIONS PROPERLY
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            Built with real constraints and real usage in mind.
          </p>
          <button
            onClick={openSignIn}
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            GET STARTED
          </button>
        </div>
      </section>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={signInWithGoogle}
        onGithubSignIn={signInWithGitHub}
      />
    </div>
  );
}
