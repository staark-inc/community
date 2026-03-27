"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: replace with real auth — e.g. await signIn("credentials", { email, password })
    await new Promise((r) => setTimeout(r, 800));
    if (email && password.length >= 6) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Try any email + 6+ char password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink-900 grid-bg flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[480px] flex-col justify-between p-12 bg-ink-800/50 border-r border-ink-600/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-volt/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-volt flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-ink-900" />
          </div>
          <span className="font-display font-700 text-xl text-ink-50">staark<span className="text-volt">.</span>inc</span>
        </Link>
        <div className="relative z-10 space-y-6">
          <h2 className="font-display font-700 text-3xl text-ink-50 leading-tight">
            Your leads.<br /><span className="text-volt">Intelligently managed.</span>
          </h2>
          <div className="space-y-4">
            {["AI-powered lead scoring & enrichment", "Real-time pipeline analytics", "Automated follow-up workflows", "Multi-channel lead capture"].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-volt/15 border border-volt/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-volt" />
                </div>
                <span className="text-sm text-ink-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="card p-5">
            <p className="text-sm text-ink-200 italic mb-4">&ldquo;Staark cut our lead response time by 70%. The AI scoring is frighteningly accurate.&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-volt/15 border border-volt/20 flex items-center justify-center text-xs font-display font-600 text-volt">SC</div>
              <div>
                <div className="text-xs font-medium text-ink-200">Sarah Chen</div>
                <div className="text-xs text-ink-400">VP Sales, Nexora</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8 animate-fade-up" style={{ opacity: 0 }}>
          <div>
            <div className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-ink-900" />
              </div>
              <span className="font-display font-700 text-lg text-ink-50">staark<span className="text-volt">.</span></span>
            </div>
            <h1 className="font-display font-700 text-3xl text-ink-50">Welcome back</h1>
            <p className="text-ink-400 mt-2 text-sm">Sign in to your Staark account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger animate-fade-in">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Email address</label>
              <input type="email" required placeholder="you@company.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-ink-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-volt hover:text-volt-400 transition-colors">Forgot password?</Link>
              </div>
              <input type="password" required placeholder="••••••••••" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-ink-500 bg-ink-700 text-volt focus:ring-volt/30 w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-ink-400 cursor-pointer">Remember me for 30 days</label>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-ink-900/30 border-t-ink-900 rounded-full animate-spin" /> Signing in...</>
              ) : (
                <>Sign in <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ink-600/40" /></div>
            <div className="relative flex justify-center text-xs text-ink-500"><span className="px-3 bg-ink-900">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary text-sm justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="btn-secondary text-sm justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-200" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-ink-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-volt hover:text-volt-400 font-medium transition-colors">Create one free</Link>
          </p>
          <Link href="/" className="flex items-center justify-center gap-1.5 text-xs text-ink-500 hover:text-ink-300 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
