"use client";

import React, { useEffect, useState, useRef } from "react";
import anime from "animejs";
import { Sparkles, Brain, Compass, Cpu, DollarSign, CheckCircle2 } from "lucide-react";

interface AiProcessingStateProps {
  ideaName: string;
}

export function AiProcessingState({ ideaName }: AiProcessingStateProps) {
  const [activeStep, setActiveStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    { title: "Deconstructing Market Signals", icon: Compass, desc: "Scanning demand, saturation & target segment dynamics..." },
    { title: "Analyzing Competitor & Risk Matrix", icon: Brain, desc: "Isolating failure vectors, moat opportunities & regulatory risks..." },
    { title: "Architecting Lean MVP Scope", icon: Cpu, desc: "Filtering Must-Haves vs Nice-to-Haves with dev day estimates..." },
    { title: "Projecting 12-Month Unit Economics", icon: DollarSign, desc: "Calculating MRR trajectories, CAC/LTV benchmarks & break-even..." },
    { title: "Compiling Strategic Dashboard", icon: Sparkles, desc: "Finalizing charts, validation sprint checklist & pitch deck..." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2200);

    return () => clearInterval(interval);
  }, [steps.length]);

  // Anime.js node & data-flow canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }> = [];

    const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#ec4899"];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-2xl md:p-12">
      {/* Background Interactive Particle Node Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      />

      {/* Central Glowing AI Pulse Core */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-indigo-600/30 blur-md" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-600 to-violet-700 shadow-xl shadow-indigo-500/30">
            <Sparkles className="h-8 w-8 text-white animate-spin" style={{ animationDuration: "8s" }} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white font-heading md:text-2xl">
          Synthesizing Intelligence for <span className="text-indigo-400">"{ideaName}"</span>
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Our Gemini AI reasoning engine is computing structured validation matrices...
        </p>

        {/* Dynamic Pipeline Steps Progression */}
        <div className="mt-8 w-full max-w-md space-y-3">
          {steps.map((step, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 rounded-xl border p-3 transition-all duration-500 ${
                  isCurrent
                    ? "border-indigo-500/50 bg-indigo-950/40 shadow-lg shadow-indigo-500/10 translate-x-1"
                    : isDone
                    ? "border-emerald-500/20 bg-slate-900/40 opacity-70"
                    : "border-white/5 bg-slate-900/20 opacity-30"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-400"
                      : isCurrent
                      ? "bg-indigo-500/30 text-indigo-300 animate-pulse"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>

                <div className="flex flex-col text-left">
                  <span
                    className={`text-xs font-semibold ${
                      isCurrent ? "text-indigo-200" : isDone ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[11px] text-slate-400 animate-fadeIn">
                      {step.desc}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
