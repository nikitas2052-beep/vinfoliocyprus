"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAgeGate } from "@/lib/store";

export default function AgeVerificationModal() {
  const hydrated = useAgeGate((s) => s.hydrated);
  const verified = useAgeGate((s) => s.verified);
  const verify = useAgeGate((s) => s.verify);

  const show = hydrated && !verified;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-burgundy-900/60 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="card-surface max-w-md w-full p-8 text-center bg-chalk"
          >
            <div className="flex justify-center mb-6">
              <div className="wine-seal !w-20 !h-20 text-3xl">V</div>
            </div>
            <h2
              id="age-title"
              className="font-serif text-3xl text-ink tracking-wide"
            >
              Welcome to Vinfolio
            </h2>
            <p className="font-serif italic text-bronze mt-1">
              Strong partnerships build stronger companies
            </p>

            <div className="gold-divider mx-auto" />

            <p className="text-cream/85 mt-4">
              You must be of legal drinking age (18+) to enter this site.
            </p>
            <p className="text-muted text-sm mt-2">
              By entering you confirm you are 18 years or older.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={verify} className="btn-gold flex-1">
                I am 18 or older
              </button>
              <a
                href="https://www.google.com"
                className="btn-ghost flex-1"
                aria-label="Leave site"
              >
                Leave site
              </a>
            </div>

            <p className="text-xs text-muted mt-6">
              Please drink responsibly. Vinfolio Ltd · Cyprus.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
