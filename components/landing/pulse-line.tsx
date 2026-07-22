"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// ponytail: abstract sparkline only — no axis, no numbers, no named index.
// A market-pulse motif for the footer divider, not a performance claim.
export function PulseLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const gold = styles.getPropertyValue("--accent").trim() || "#B8912F";

    const step = 6;
    let points: number[] = [];
    let scrollOffset = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.ceil(rect.width / step) + 4;
      if (points.length === 0) {
        points = [0];
        for (let i = 1; i < count; i++) {
          const prev = points[i - 1];
          const delta = (Math.random() - 0.5) * 0.5;
          points.push(Math.max(-1, Math.min(1, prev + delta)));
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const midY = rect.height / 2;
      const amp = rect.height * 0.38;

      scrollOffset += 0.6;
      if (scrollOffset >= step) {
        scrollOffset -= step;
        points.shift();
        const prev = points[points.length - 1];
        const delta = (Math.random() - 0.5) * 0.5;
        points.push(Math.max(-1, Math.min(1, prev + delta)));
      }

      ctx.beginPath();
      points.forEach((p, i) => {
        const x = i * step - scrollOffset;
        const y = midY - p * amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = gold;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.65;
      ctx.stroke();

      // faint centerline (ledger rule)
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(rect.width, midY);
      ctx.strokeStyle = gold;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} aria-hidden="true" />;
}
