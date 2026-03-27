"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", password: "", teamSize: "", terms: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.terms) { setError("Please accept the Terms of Service to continue."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    // TODO: replace with real registration API call
    // const res = await fetch("/api/auth/register", { method: "POST", body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 900));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-ink-900 grid-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 animate-fade-up" style={{ opacity: 0 }}>
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-volt flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-ink-900" />
            </div>
            <span className="font-display font-700 text-xl text-ink-50">staark<span className="text-volt">.</span>inc</span>
          </Link>
          <h1 className="font-display font-700 text-3xl text-ink-50">Start your free trial</h1>
          <p className="text-ink-400 mt-2 text-sm">No credit card required. 14 days free.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {["Free 14-day trial", "No credit card", "Cancel anytime"].map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-xs text-ink-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> {b}
            </div>
          ))}
        </div>

        <div className="card p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger animate-fade-in">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">First name</label>
                <input type="text" required placeholder="John" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="input" />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-300 mb-1.5">Last name</label>
                <input type="text" required placeholder="Doe" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="input" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Work email</label>
              <input type="email" required placeholder="you@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} className="input" />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Company name</label>
              <input type="text" required placeholder="Acme Inc." value={form.company} onChange={(e) => set("company", e.target.value)} className="input" />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Password</label>
              <input type="password" required placeholder="Min. 8 characters" value={form.password} onChange={(e) => set("password", e.target.value)} className="input" />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Team size</label>
              <select value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} className="input text-sm appearance-none" required>
                <option value="">Select team size</option>
                <option>Just me</option>
                <option>2–10 people</option>
                <option>11–50 people</option>
                <option>51–200 people</option>
                <option>200+ people</option>
              </select>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="terms" checked={form.terms} onChange={(e) => set("terms", e.target.checked)} className="rounded border-ink-500 bg-ink-700 text-volt focus:ring-volt/30 w-4 h-4 mt-0.5" />
              <label htmlFor="terms" className="text-xs text-ink-400 cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-volt hover:text-volt-400 transition-colors">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-volt hover:text-volt-400 transition-colors">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-ink-900/30 border-t-ink-900 rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-ink-400">
          Already have an account?{" "}
          <Link href="/login" className="text-volt hover:text-volt-400 font-medium transition-colors">Sign in</Link>
        </p>

        <Link href="/" className="flex items-center justify-center gap-1.5 text-xs text-ink-500 hover:text-ink-300 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to homepage
        </Link>
      </div>
    </div>
  );
}
