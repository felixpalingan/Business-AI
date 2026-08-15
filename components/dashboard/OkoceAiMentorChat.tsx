"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  MessageSquare,
  GraduationCap,
  Building,
  ShieldCheck,
  ChevronRight,
  Loader2,
} from "lucide-react";
import type { BusinessDiagnosticResult } from "@/types/business-analysis";

interface OkoceAiMentorChatProps {
  diagnostic: BusinessDiagnosticResult;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How can I separate my personal and business bank accounts easily?",
  "Help me draft a simple daily SOP for my staff to prevent inventory leaks.",
  "What specific steps do I need to advance from P4 (Licensing) to P7 (Capital Access)?",
  "How can I calculate my exact Gross & Net Profit Margin per product line?",
];

export function OkoceAiMentorChat({ diagnostic, isOpen, onClose }: OkoceAiMentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting: Message = {
        id: "init",
        role: "assistant",
        content: `Hello! I am your **OK OCE AI Mentor & MSME Growth Coach** 👨‍🏫.

I have loaded the complete business diagnostic audit for **${diagnostic.input.businessName}**:
- **Official Tier:** ${diagnostic.msmeClassification.category}
- **Health Check Score:** ${diagnostic.executiveOverview.overallHealthScore} / 100 (${diagnostic.executiveOverview.healthVerdict})
- **Recommended Mentorship Track:** ${diagnostic.okoceMentorship.recommendedTrack}

How can I assist you with your 14-day action plan or operational roadmap today? Feel free to pick a quick question below!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([initialGreeting]);
    }
  }, [isOpen, diagnostic, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/mentoring-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          diagnostic,
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I am here to guide your MSME journey. Please feel free to ask your next question!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fadeIn no-print">
      <div className="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-red-50/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-700 text-white shadow-md shadow-red-700/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  OK OCE AI Mentor & Growth Coach
                </h3>
                <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  Live Context Ingested
                </span>
              </div>
              <p className="text-xs text-slate-600">
                1-on-1 Interactive Mentoring Session for {diagnostic.input.businessName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Diagnostic Snapshot Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-2.5 text-xs">
          <div className="flex items-center gap-4 text-slate-700">
            <span className="flex items-center gap-1 font-medium">
              <Building className="h-3.5 w-3.5 text-red-700" />
              <strong>Tier:</strong> {diagnostic.msmeClassification.category}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              <strong>Score:</strong> {diagnostic.executiveOverview.overallHealthScore}/100
            </span>
          </div>
          <span className="hidden sm:block text-[11px] text-red-800 font-semibold">
            Track: {diagnostic.okoceMentorship.recommendedTrack}
          </span>
        </div>

        {/* Chat Transcript Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                  msg.role === "user"
                    ? "bg-red-700 text-white shadow-xs"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-red-700 text-white rounded-tr-none shadow-sm"
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs space-y-2"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <span className={`block text-[10px] text-right pt-1 opacity-70 ${msg.role === "user" ? "text-red-100" : "text-slate-400"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-red-700 shadow-2xs">
                <Loader2 className="h-4 w-4 animate-spin text-red-700" />
                <span>OK OCE AI Mentor is analyzing your prompt...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Guided Quick-Prompt Chips */}
        <div className="border-t border-slate-200 bg-white px-6 py-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Suggested Quick Mentoring Questions:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {QUICK_PROMPTS.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(promptText)}
                className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-700 hover:border-red-400 hover:bg-red-50 hover:text-red-800 whitespace-nowrap transition-all shadow-2xs"
              >
                <MessageSquare className="h-3 w-3 text-red-700 shrink-0" />
                <span>{promptText}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3 border-t border-slate-200 bg-white p-4"
        >
          <input
            type="text"
            placeholder="Ask your OK OCE AI Mentor any question about business health, SOPs, margins, or permodalan..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isTyping}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-700 text-white hover:bg-red-800 disabled:opacity-50 transition-colors shadow-md shadow-red-700/20"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default OkoceAiMentorChat;
