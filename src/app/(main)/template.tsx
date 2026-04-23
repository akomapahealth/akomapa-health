"use client";

import { motion } from "framer-motion";
import { motionDurations } from "@/lib/motion/tokens";

export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex-grow"
      initial={{ opacity: 0.97 }}
      animate={{ opacity: 1 }}
      transition={{ duration: motionDurations.enter * 0.75, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
