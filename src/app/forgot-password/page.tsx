"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-ink-900 grid-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-8 animate-fade-up" style={{ opacity: 0 }}>
        <Link href="/" className="flex items-center gap-2.5 justify-center">
          <div className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-ink-900" />
          </div>
          <span className="font-display font-700 text-lg text-ink-50">staark<span className="text-volt">.</span></span>
        </Link>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h1 className="font-display font-700 text-2xl text-ink-50">Check your inbox</h1>
            <p className="text-sm text-ink-400">
              If that email is linked to a Staark account, we&apos;ve sent a reset link. Check your spam folder if you don&apos;t see it.
            </p>
            <Link href="/login" className="btn-ghost text-sm inline-flex">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <div>
              <h1 className="font-display font-700 text-3xl text-ink-50">Reset your password</h1>
              <p className="text-ink-400 mt-2 text-sm">
                Enter your email and we&apos;ll send a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">Email address</label>
                <input type="email" required placeholder="you@company.com" autoComplete="email" className="input" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3 text-sm">
                Send reset link <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <Link href="/login" className="flex items-center justify-center gap-1.5 text-xs text-ink-500 hover:text-ink-300 transition-colors">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
