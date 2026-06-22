"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-wide py-24 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="heading-serif text-4xl md:text-5xl mt-2">
        Let&apos;s try that again
      </h1>
      <div className="gold-divider mx-auto" />
      <p className="text-muted mt-3 max-w-md mx-auto">
        Sorry, this page ran into a problem. Please try reloading, or head back
        to the collection.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button onClick={reset} className="btn-gold">
          Try again
        </button>
        <Link href="/" className="btn-chalk">
          Home
        </Link>
      </div>
    </div>
  );
}
