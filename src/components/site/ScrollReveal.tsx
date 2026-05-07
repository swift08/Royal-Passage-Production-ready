import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const softEase = [0.22, 1, 0.36, 1] as const;

const groupVar: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: softEase },
  },
};

export function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: softEase }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={groupVar}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVar}>
      {children}
    </motion.div>
  );
}
