"use client";
import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // "user" = honour the OS prefers-reduced-motion setting for every motion component.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
