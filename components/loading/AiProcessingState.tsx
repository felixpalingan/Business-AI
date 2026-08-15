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

    const colors = ["#990000", "#FFCC00", "#0284c7", "#10b981", "#dc2626"];

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
            ctx.strokeStyle = `rgba(153, 0, 0, ${0.15 * (1 - dist / 90)})`;
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
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-2xl space-y-6">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />

      <div className="relative z-10 text-center space-y-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700 border border-red-200 shadow-xs">
          <Sparkles className="h-6 w-6 animate-spin" style={{ animationDuration: "3s" }} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-heading">
          Diagnosing Enterprise Health: <span className="text-red-700">{ideaName}</span>
        </h3>
        <p className="text-xs text-slate-500">
          OK OCE AI Diagnostic Specialist is evaluating financial, operational, and regulatory health...
        </p>
      </div>

      {/* Progress Steps */}
      <div className="relative z-10 space-y-3 border-t border-slate-100 pt-4">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-2xl border p-3.5 transition-all duration-300 ${
                isCurrent
                  ? "border-red-500 bg-red-50/80 shadow-md ring-1 ring-red-500 scale-[1.01]"
                  : isDone
                  ? "border-emerald-200 bg-emerald-50 text-slate-600"
                  : "border-slate-100 bg-slate-50 opacity-50"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  isCurrent
                    ? "bg-red-700 text-white shadow-xs"
                    : isDone
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
              </div>

              <div className="space-y-0.5">
                <p className={`text-xs font-bold ${isCurrent ? "text-red-900" : isDone ? "text-slate-800" : "text-slate-500"}`}>
                  {step.title}
                </p>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AiProcessingState;
