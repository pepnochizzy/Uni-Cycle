"use client";
import * as motion from "motion/react-client";
// import type { Variants } from "motion/react";

//! Make sure to add children as a function prop and then include the {children} to designate where the animation 'effects'! :)
export default function EnterAnimate({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
