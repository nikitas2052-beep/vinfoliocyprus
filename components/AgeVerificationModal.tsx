"use client";

import Image from "next/image";
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
          className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-paper border border-line max-w-md w-full px-7 pt-10 pb-8 text-center shadow-2xl"
          >
            {/* Vinfolio logo at the top of the modal */}
            <div className="flex justify-center mb-5">
              <Image
                src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
                alt="Vinfolio"
                width={320}
                height={92}
                priority
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>

            <h2
              id="age-title"
              className="font-serif text-2xl sm:text-3xl text-ink tracking-wide"
            >
              Welcome
            </h2>
            <p className="font-serif italic text-bronze mt-2 text-sm sm:text-base">
              Strong partnerships, poured by hand.
            </p>

            <div className="h-px w-12 bg-bronze mx-auto my-5" />

            <p className="text-ink/85 leading-relaxed">
              You must be of legal drinking age{" "}
              <span className="font-semibold">(18+)</span> to enter this site.
            </p>
            <p className="text-muted text-sm mt-2">
              By entering you confirm you are 18 years or older.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                onClick={verify}
                className="flex-1 inline-flex items-center justify-center
                           px-6 py-3 bg-ink text-paper uppercase text-[13px] tracking-[0.06em]
                           hover:bg-wine transition-colors"
              >
                I am 18 or older
              </button>
              <a
                href="https://www.google.com"
                className="flex-1 inline-flex items-center justify-center
                           px-6 py-3 bg-paper text-ink border border-ink/30
                           uppercase text-[13px] tracking-[0.06em]
                           hover:bg-chalk transition-colors"
                aria-label="Leave site"
              >
                Leave site
              </a>
            </div>

            <p className="text-xs text-muted mt-5">
              Please drink responsibly. Vinfolio Ltd · Cyprus.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
