"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  // Starts visible: content must never wait on JS to appear. Below-fold
  // elements get hidden synchronously right after mount (before paint) so
  // the scroll-in animation still plays; anything already in view on load
  // just stays visible the whole time.
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 1.2 && rect.bottom > 0;
    if (!alreadyInView) setIsVisible(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Fires while the element is still ~20% below the viewport so the
    // (short) reveal transition is done by the time it's actually visible.
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold, rootMargin: "0px 0px 20% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}
