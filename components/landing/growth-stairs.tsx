"use client";

import { useEffect, useRef } from "react";

export function GrowthStairs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || "#1F4D3D";
    const gold = styles.getPropertyValue("--accent").trim() || "#B8912F";

    const steps = 7;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const padding = 24;
      const usableW = rect.width - padding * 2;
      const usableH = rect.height - padding * 2;
      const barWidth = usableW / steps - 8;
      const cycle = 4; // seconds per loop
      const progress = (time % cycle) / cycle;

      const heights: number[] = [];
      for (let i = 0; i < steps; i++) {
        const target = ((i + 1) / steps) ** 1.3;
        const reveal = Math.min(1, Math.max(0, progress * steps - i * 0.65));
        heights.push(target * reveal);
      }

      // bars
      heights.forEach((h, i) => {
        const x = padding + i * (usableW / steps) + 4;
        const barH = h * usableH;
        const y = rect.height - padding - barH;
        ctx.fillStyle = primary;
        ctx.globalAlpha = 0.16 + h * 0.2;
        ctx.fillRect(x, y, barWidth, barH);
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barWidth, barH);
        ctx.globalAlpha = 1;
      });

      // compounding curve over the tops
      ctx.beginPath();
      heights.forEach((h, i) => {
        const x = padding + i * (usableW / steps) + usableW / steps / 2;
        const y = rect.height - padding - h * usableH - 6;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = gold;
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // baseline (ledger rule)
      ctx.beginPath();
      ctx.moveTo(padding, rect.height - padding + 0.5);
      ctx.lineTo(rect.width - padding, rect.height - padding + 0.5);
      ctx.strokeStyle = primary;
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      time += 1 / 60;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} aria-hidden="true" />;
}
