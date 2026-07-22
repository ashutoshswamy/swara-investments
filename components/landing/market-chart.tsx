"use client";

import { useEffect, useRef } from "react";

type Candle = { open: number; close: number; high: number; low: number };

// ponytail: abstract, unlabeled candlesticks only — no axis, no % figures, no
// real index. Decorative market motif, not a performance claim.
function nextCandle(prevClose: number): Candle {
  const drift = 0.52; // slight upward bias, not a promise — just keeps the tape from looking dead
  const open = prevClose;
  const change = (Math.random() - (1 - drift)) * 18;
  const close = Math.max(20, Math.min(140, open + change));
  const wick = Math.random() * 10 + 3;
  return {
    open,
    close,
    high: Math.max(open, close) + wick * Math.random(),
    low: Math.min(open, close) - wick * Math.random(),
  };
}

export function MarketChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const up = styles.getPropertyValue("--primary").trim() || "#1F4D3D";
    const down = styles.getPropertyValue("--destructive").trim() || "#8A3B2B";
    const line = styles.getPropertyValue("--foreground").trim() || "#14231D";

    const candleWidth = 26;
    let candles: Candle[] = [];
    let scrollOffset = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.ceil(rect.width / candleWidth) + 2;
      if (candles.length === 0) {
        candles = [{ open: 80, close: 80, high: 82, low: 78 }];
        for (let i = 1; i < count; i++) candles.push(nextCandle(candles[i - 1].close));
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const padding = 16;
      const plotHeight = rect.height - padding * 2;
      const scale = plotHeight / 160;
      const baseY = rect.height - padding;

      scrollOffset += 0.35;
      if (scrollOffset >= candleWidth) {
        scrollOffset -= candleWidth;
        candles.shift();
        candles.push(nextCandle(candles[candles.length - 1].close));
      }

      // moving-average line across the visible candles
      ctx.beginPath();
      candles.forEach((c, i) => {
        const x = i * candleWidth - scrollOffset + candleWidth / 2;
        const y = baseY - ((c.open + c.close) / 2) * scale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = line;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      candles.forEach((c, i) => {
        const x = i * candleWidth - scrollOffset;
        const isUp = c.close >= c.open;
        ctx.strokeStyle = isUp ? up : down;
        ctx.fillStyle = isUp ? up : down;

        // wick
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, baseY - c.high * scale);
        ctx.lineTo(x + candleWidth / 2, baseY - c.low * scale);
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        // body
        const top = baseY - Math.max(c.open, c.close) * scale;
        const height = Math.max(2, Math.abs(c.close - c.open) * scale);
        ctx.globalAlpha = isUp ? 0.18 : 0.14;
        ctx.fillRect(x + 5, top, candleWidth - 10, height);
        ctx.globalAlpha = 0.6;
        ctx.strokeRect(x + 5, top, candleWidth - 10, height);
        ctx.globalAlpha = 1;
      });

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
