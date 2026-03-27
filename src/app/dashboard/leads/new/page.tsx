"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const sources = ["LinkedIn", "Website", "Referral", "Cold Outreach", "Email", "Event", "Other"];
const statuses = ["new", "contacted", "qualified", "proposal"];

export default function NewLeadPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    source: "",
    status: "new",
    value: "",
    notes: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // POST to API
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // fail silently in template mode
    }
    // Simulate brief save
    await new Promise((r) => setTimeout(r, 600));
    router.push("/dashboard/leads");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/leads" className="btn-ghost text-sm">
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Add lead</h1>
          <p className="text-sm text-ink-400 mt-0.5">Fill in the details for the new lead.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Company & Contact */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-600 text-ink-100">Company & Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Company name *</label>
              <input
                type="text"
                required
                placeholder="Acme Corp"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Contact name *</label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={form.contact}
                onChange={(e) => set("contact", e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Email *</label>
              <input
                type="email"
                required
                placeholder="jane@acme.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 0100"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Lead details */}
        <div className="card p-6 space-y-4">
          <h2 className="font-display font-600 text-ink-100">Lead Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Source</label>
              <select
                value={form.source}
                onChange={(e) => set("source", e.target.value)}
                className="input text-sm"
              >
                <option value="">Select source</option>
                {sources.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="input text-sm capitalize"
              >
                {statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-300 mb-1.5">Deal value (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 text-sm">$</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                className="input pl-7"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-300 mb-1.5">Notes</label>
            <textarea
              rows={4}
              placeholder="Additional context about this lead..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className="input resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/dashboard/leads" className="btn-ghost text-sm">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-ink-900/30 border-t-ink-900 rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save lead
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
