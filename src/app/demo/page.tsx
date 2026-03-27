"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-ink-900 grid-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-9 h-9 rounded-xl bg-volt flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-ink-900" />
          </div>
          <span className="font-display font-700 text-xl text-ink-50">staark<span className="text-volt">.</span>inc</span>
        </Link>

        {submitted ? (
          <div className="card p-10 text-center animate-fade-up" style={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <h2 className="font-display font-700 text-2xl text-ink-50 mb-2">You&apos;re booked!</h2>
            <p className="text-ink-300 text-sm mb-6">
              We&apos;ll send a calendar invite to your email within 15 minutes. Talk soon!
            </p>
            <Link href="/" className="btn-ghost text-sm">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to home
            </Link>
          </div>
        ) : (
          <div className="card p-8 space-y-6 animate-fade-up" style={{ opacity: 0 }}>
            <div>
              <h1 className="font-display font-700 text-2xl text-ink-50 mb-1">Book a demo</h1>
              <p className="text-sm text-ink-400">30-minute live walkthrough with our team. No sales pressure.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["No commitment", "Live Q&A", "Custom to your use case"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-ink-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" /> {b}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">First name</label>
                  <input type="text" required placeholder="John" className="input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Last name</label>
                  <input type="text" required placeholder="Doe" className="input" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">Work email</label>
                <input type="email" required placeholder="you@company.com" className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">Company</label>
                <input type="text" required placeholder="Acme Inc." className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">Team size</label>
                <select className="input text-sm" required>
                  <option value="">Select team size</option>
                  <option>Just me</option>
                  <option>2–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>200+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">What would you like to see?</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder="Lead scoring, automation workflows, API integrations..."
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                Book my demo <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
