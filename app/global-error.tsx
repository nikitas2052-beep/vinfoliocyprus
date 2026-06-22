"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          fontFamily: "Georgia, serif",
          color: "#242E35",
          background: "#fff",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 32 }}>Something went wrong</h1>
        <p style={{ color: "#6b7280", maxWidth: 420 }}>
          Please reload the page. If the problem continues, try again in a
          moment.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 8,
            padding: "10px 22px",
            background: "#242E35",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontSize: 13,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
