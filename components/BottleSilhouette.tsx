import type { Wine } from "@/lib/types";

/**
 * Detects whether a wine.image URL is one of our generic Unsplash
 * placeholders (vs a real vinfolio.com.cy bottle photo). 38 wines
 * currently fall through to this path because no labelled bottle
 * has been uploaded yet.
 */
export function isPlaceholderImage(src?: string): boolean {
  if (!src) return true;
  return src.includes("unsplash.com");
}

const TYPE_PALETTE: Record<Wine["type"], { glass: string; cap: string; label: string }> = {
  Red: { glass: "#2A0A10", cap: "#1A0508", label: "#F5EFE3" },
  White: { glass: "#3D3520", cap: "#26200E", label: "#FFFCF2" },
  Rosé: { glass: "#C39EA0", cap: "#5C2D33", label: "#FFF6F4" },
  Sparkling: { glass: "#1F2A1A", cap: "#15170D", label: "#F6E6A1" },
  "Sparkling Rosé": { glass: "#5C2D33", cap: "#2E1417", label: "#F6E6A1" },
};

/**
 * Inline SVG fallback bottle. Drawn in the wine's type colours with
 * a small "VINFOLIO" wordmark on the label so the card never looks
 * empty or like a broken image.
 */
export default function BottleSilhouette({ wine }: { wine: Wine }) {
  const c = TYPE_PALETTE[wine.type];
  const initial = wine.winery
    .replace(/^(Viña|Domaine|Chateau|Château|Les|La)\s+/i, "")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-chalk">
      <svg
        viewBox="0 0 120 320"
        className="h-[92%] w-auto"
        role="img"
        aria-label={wine.name}
      >
        {/* Foil cap */}
        <rect x="48" y="18" width="24" height="34" rx="1" fill={c.cap} />
        {/* Bottle neck + body */}
        <path
          d="
            M 50 50
            L 70 50
            L 70 80
            C 70 92, 90 100, 90 122
            L 90 286
            C 90 296, 84 302, 76 302
            L 44 302
            C 36 302, 30 296, 30 286
            L 30 122
            C 30 100, 50 92, 50 80
            Z
          "
          fill={c.glass}
        />
        {/* Subtle glass highlight */}
        <path
          d="M 38 140 Q 35 220, 38 280"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Paper label */}
        <rect x="34" y="170" width="52" height="76" fill={c.label} />
        <line x1="40" y1="200" x2="80" y2="200" stroke={c.glass} strokeWidth="0.5" opacity="0.4" />
        <text
          x="60"
          y="195"
          textAnchor="middle"
          fontFamily="Cormorant Infant, Georgia, serif"
          fontStyle="italic"
          fontSize="14"
          fill={c.glass}
        >
          VINFOLIO
        </text>
        <text
          x="60"
          y="222"
          textAnchor="middle"
          fontFamily="Cormorant Infant, Georgia, serif"
          fontSize="22"
          fontWeight="500"
          fill={c.glass}
        >
          {initial}
        </text>
        <text
          x="60"
          y="238"
          textAnchor="middle"
          fontFamily="Alata, sans-serif"
          fontSize="5"
          letterSpacing="0.8"
          fill={c.glass}
          opacity="0.7"
        >
          {wine.type.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
