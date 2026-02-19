"use client";
import * as motion from "motion/react-client";

//! This animation triggers when hovering over an element

export default function HoverAnimate({ children }) {
  return (
    <motion.div whileHover={{ rotate: 360, scale: 1.2 }}>{children}</motion.div>
  );
}
