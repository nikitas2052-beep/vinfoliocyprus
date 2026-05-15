"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedHeading — splits a heading into words and reveals each
 * with a small staggered fade-up. Children can include nested
 * <span> for styling specific words.
 */
export default function AnimatedHeading({
  children,
  className,
  as = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = motion[as];

  return (
    <Tag
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.06, delayChildren: 0.05 }}
      className={cn("heading-serif", className)}
    >
      {flattenChildren(children)}
    </Tag>
  );
}

/* Walk children — wrap each word with a motion span. */
function flattenChildren(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((word, i) =>
      word.trim() === "" ? (
        <span key={i}>{word}</span>
      ) : (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ),
    );
  }
  if (Array.isArray(node)) return node.map((n, i) => <span key={i}>{flattenChildren(n)}</span>);
  return node;
}
