"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface full detail in the console too.
    console.error("CAUGHT BY app/error.tsx:", error);
  }, [error]);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "monospace",
        fontSize: 14,
        lineHeight: 1.5,
        color: "#242E35",
        maxWidth: 900,
        margin: "40px auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>Something went wrong</h2>
      <p>
        <b>name:</b> {error?.name || "(none)"}
      </p>
      <p>
        <b>message:</b> {error?.message || "(none)"}
      </p>
      <p>
        <b>digest:</b> {error?.digest || "(none)"}
      </p>
      <p style={{ marginTop: 12 }}>
        <b>stack:</b>
        {"\n"}
        {error?.stack || "(none)"}
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: 20,
          padding: "8px 16px",
          background: "#242E35",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
