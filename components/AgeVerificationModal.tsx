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
          className="fixed inset-0 z-[100] bg-ink/70 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-paper max-w-md w-full shadow-2xl"
          >
            {/* Wine-red top accent */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-bronze" />

            {/* Inner label-style frame */}
            <div className="pointer-events-none absolute inset-3 border border-bronze/20" />

            <div className="relative px-8 pt-10 pb-8 text-center">
              <p className="text-[10px] uppercase tracking-[0.34em] text-bronze/80 font-sans">
                Fine Wine · Cyprus
              </p>

              <div className="flex justify-center mt-4">
                <Image
                  src="https://vinfolio.com.cy/wp-content/uploads/2020/03/Logo-Transparent-1.png"
                  alt="Vinfolio"
                  width={300}
                  height={86}
                  priority
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* Wine glass line illustration */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center my-6"
                aria-hidden
              >
                <WineGlass />
              </motion.div>

              <h2
                id="age-title"
                className="font-serif text-[1.7rem] sm:text-3xl text-ink leading-tight"
              >
                Are you of legal
                <br className="hidden sm:block" /> drinking age?
              </h2>

              <p className="text-muted text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                You must be <span className="text-ink font-medium">18 or over</span>{" "}
                to step into our cellar and explore the collection.
              </p>

              <div className="mt-7 flex flex-col gap-2.5">
                <button
                  onClick={verify}
                  className="inline-flex items-center justify-center px-6 py-3.5
                             bg-wine text-paper uppercase text-[13px] tracking-[0.08em]
                             border border-wine hover:bg-wine-500 transition-colors"
                >
                  Yes, I am 18 or older
                </button>
                <a
                  href="https://www.google.com"
                  className="inline-flex items-center justify-center px-6 py-3
                             bg-transparent text-ink/70 border border-line
                             uppercase text-[12px] tracking-[0.08em]
                             hover:bg-chalk hover:text-ink transition-colors"
                  aria-label="Leave site"
                >
                  No, take me back
                </a>
              </div>

              {/* Ornamental divider */}
              <div className="flex items-center justify-center gap-3 mt-7">
                <span className="h-px w-10 bg-line" />
                <span className="text-bronze text-xs">&#10086;</span>
                <span className="h-px w-10 bg-line" />
              </div>

              <p className="text-[11px] text-muted mt-3 tracking-wide">
                Please enjoy responsibly · Vinfolio Ltd, Cyprus
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Elegant wine-glass line illustration, drawn in the wine-red accent. */
function WineGlass() {
  return (
    <svg
      width="56"
      height="78"
      viewBox="0 0 56 78"
      fill="none"
      className="text-bronze"
    >
      {/* Bowl */}
      <path
        d="M11 5h34c0 15.5-6.8 27-17 27S11 20.5 11 5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Wine inside the bowl */}
      <path
        d="M14 13.5h28c-1.4 11-7 18.5-14 18.5S15.4 24.5 14 13.5Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      {/* Stem */}
      <path d="M28 32v34" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {/* Foot */}
      <path d="M16 70h24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M28 66c0 2.2 4 3 12 4M28 66c0 2.2-4 3-12 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
