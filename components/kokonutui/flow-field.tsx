"use client";

import React, { useEffect, useRef } from "react";

export function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      maxAge: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(99, 102, 241, 0.4)",  // Indigo
      "rgba(139, 92, 246, 0.35)", // Violet
      "rgba(6, 182, 212, 0.3)",   // Cyan
      "rgba(16, 185, 129, 0.25)", // Emerald
    ];

    const numParticles = 65;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        age: Math.random() * 100,
        maxAge: 150 + Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.004;
      ctx.fillStyle = "rgba(9, 10, 18, 0.2)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.age++;
        if (p.age > p.maxAge) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.age = 0;
        }

        // Flow angle noise equation
        const angle =
          (Math.sin(p.x * 0.005 + time) + Math.cos(p.y * 0.005 + time)) * Math.PI;

        p.vx += Math.cos(angle) * 0.15;
        p.vy += Math.sin(angle) * 0.15;

        // Friction
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle line
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-65"
    />
  );
}

export default FlowField;
