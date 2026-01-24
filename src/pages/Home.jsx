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
  'text-3xl font-bold tracking-wide text-center uppercase';

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
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
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
      <section className="px-6 max-w-5xl mx-auto mb-36">
        <h2 className={`${SECTION_HEADING} mb-14`}>
          THE PROBLEM THIS SOLVES
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            'Applications scattered across multiple platforms',
            'No clear visibility into interview progress',
            'Spreadsheets becoming unmanageable over time',
            'Browser storage failing with large datasets',
          ].map((problem, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-6 text-muted-foreground text-center"
            >
              {problem}
            </div>
          ))}
        </div>
      </section>

      {/* ================= BUILT FOR REAL USAGE ================= */}
      <section className="px-6 max-w-6xl mx-auto mb-36">
        <h2 className={`${SECTION_HEADING} mb-14`}>
          BUILT FOR REAL USAGE
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border bg-card p-8 text-center">
            <Users className="mx-auto mb-4 text-primary" />
            <p className="font-semibold uppercase mb-1">
              Real Users
            </p>
            <p className="text-sm text-muted-foreground">
              Actively storing job data in Firestore
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-8 text-center">
            <Server className="mx-auto mb-4 text-primary" />
            <p className="font-semibold uppercase mb-1">
              Cloud-backed
            </p>
            <p className="text-sm text-muted-foreground">
              No dependency on browser or device storage
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-8 text-center">
            <ShieldCheck className="mx-auto mb-4 text-primary" />
            <p className="font-semibold uppercase mb-1">
              Private by Design
            </p>
            <p className="text-sm text-muted-foreground">
              Each user sees only their own data
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISUAL JOB TRACKING ================= */}
      <section className="px-6 max-w-6xl mx-auto mb-40">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          VISUAL JOB TRACKING
        </h2>

        <div className="rounded-2xl border bg-card p-4 shadow-sm">
          <img
            src="/screenshots/kanban-preview.png"
            alt="Job Application Tracker Kanban View"
            className="rounded-xl w-full"
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Static preview from the live application
        </p>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 max-w-4xl mx-auto mb-36">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          HOW IT WORKS
        </h2>

        <div className="space-y-6">
          {[
            'Sign in securely using Google or GitHub',
            'Add job applications with company and role details',
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
      <section className="px-6 max-w-6xl mx-auto mb-40">
        <h2 className={`${SECTION_HEADING} mb-12`}>
          CORE FEATURES
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: LayoutGrid,
              title: 'Kanban Tracking',
              desc: 'Clearly defined stages from Wishlist to Offer.',
            },
            {
              icon: Clock,
              title: 'Timeline View',
              desc: 'Chronological visibility of your job search.',
            },
            {
              icon: Database,
              title: 'Cloud Storage',
              desc: 'Job data stored safely in Firestore.',
            },
            {
              icon: Lock,
              title: 'Private by Design',
              desc: 'User-scoped authentication and access.',
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="rounded-xl border bg-card p-6">
                <Icon className="text-primary mb-4" size={26} />
                <h3 className="font-semibold mb-2 uppercase">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <div className="rounded-2xl bg-primary text-primary-foreground p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 uppercase">
            Start Tracking Applications Properly
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            Built for real workflows, not demos.
          </p>
          <button
            onClick={openSignIn}
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:opacity-90 transition"
          >
            GET STARTED
          </button>
        </div>
      </section>

      {/* ================= SIGN IN ================= */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onGoogleSignIn={signInWithGoogle}
        onGithubSignIn={signInWithGitHub}
      />
    </div>
  );
}
