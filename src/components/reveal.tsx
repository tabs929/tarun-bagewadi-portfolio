"use client";

import { motion } from "motion/react";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={false} whileInView={{ opacity: [0.7, 1], y: [12, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
