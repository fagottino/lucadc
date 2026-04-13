"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
}>) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.2, 0.9, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
