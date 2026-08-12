"use client";

import React, { useEffect, useState, useRef } from "react";
import { Sparkles, Brain, Compass, Cpu, DollarSign, CheckCircle2, Building2, GraduationCap } from "lucide-react";

interface AiProcessingStateProps {
  ideaName: string;
}

export function AiProcessingState({ ideaName }: AiProcessingStateProps) {
  const [activeStep, setActiveStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps = [
    { title: "Auditing Financial Ratios & Cash Flow Health", icon: DollarSign, desc: "Analyzing revenue scales, gross margins & working capital runway..." },
    { title: "Classifying Indonesian MSME Law Scale (UU UMKM)", icon: Building2, desc: "Benchmarking against UU No. 20/2008 & PP 7/2021 criteria..." },
    { title: "Evaluating 5-Pillar Operational & SOP Bottlenecks", icon: Cpu, desc: "Diagnosing workflow friction, team productivity & supply chain..." },
    { title: "Synthesizing Prioritized Gap Remediation Matrix", icon: Brain, desc: "Formulating P0/P1/P2 tactical solutions and 30-day turnaround sprint..." },
    { title: "Curating OK OCE Mentorship Roadmap & 12-Month Simulation", icon: GraduationCap, desc: "Matching specialist mentors and projecting business recovery curves..." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2200);

    return () => clearInterval(interval);
  }, [steps.length]);

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

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 90)})`;
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
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
      {/* Anime.js Background Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 text-center space-y-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
          <Sparkles className="h-6 w-6 animate-spin-slow" />
        </div>
        <h3 className="text-xl font-bold text-white font-heading">
          Diagnosing Enterprise Health: <span className="text-indigo-400">{ideaName}</span>
        </h3>
        <p className="text-xs text-slate-400">
          OK OCE AI Diagnostic Specialist is evaluating financial, operational, and regulatory health...
        </p>
      </div>

      {/* Progress Steps */}
      <div className="relative z-10 space-y-3 border-t border-white/10 pt-4">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-2xl border p-3.5 transition-all duration-300 ${
                isCurrent
                  ? "border-indigo-500/60 bg-indigo-950/40 shadow-lg shadow-indigo-500/10 scale-[1.01]"
                  : isDone
                  ? "border-emerald-500/30 bg-emerald-950/20 text-slate-400"
                  : "border-white/5 bg-slate-950/40 opacity-40"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  isCurrent
                    ? "bg-indigo-600 text-white"
                    : isDone
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
              </div>

              <div className="space-y-0.5">
                <p className={`text-xs font-bold ${isCurrent ? "text-white" : isDone ? "text-slate-300" : "text-slate-500"}`}>
                  {step.title}
                </p>
                <p className="text-[11px] text-slate-400">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AiProcessingState;
