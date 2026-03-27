"use client";

import { useState } from "react";
import {
  ArrowRight,
  Clock,
  GitBranch,
  Mail,
  MoreHorizontal,
  Play,
  Plus,
  Pause,
  Tag,
  UserCheck,
  Zap,
} from "lucide-react";

const automations = [
  {
    id: "A-001",
    name: "New Lead Welcome Email",
    description: "Sends a personalized welcome email when a new lead is created.",
    trigger: "Lead Created",
    actions: ["Send Email"],
    status: "active",
    runs: 1248,
    lastRun: "2m ago",
  },
  {
    id: "A-002",
    name: "Qualify High-Score Leads",
    description: "Automatically marks leads with score ≥ 85 as qualified and notifies the owner.",
    trigger: "Score Updated",
    actions: ["Update Status", "Notify Owner"],
    status: "active",
    runs: 342,
    lastRun: "1h ago",
  },
  {
    id: "A-003",
    name: "Proposal Follow-Up",
    description: "Sends a follow-up email 3 days after a proposal is sent with no response.",
    trigger: "Status = Proposal (3 days)",
    actions: ["Send Email"],
    status: "active",
    runs: 89,
    lastRun: "1d ago",
  },
  {
    id: "A-004",
    name: "Re-engage Lost Leads",
    description: "Tags and schedules a check-in for leads marked as lost after 30 days.",
    trigger: "Lead Lost (30 days)",
    actions: ["Add Tag", "Create Task"],
    status: "paused",
    runs: 54,
    lastRun: "1w ago",
  },
  {
    id: "A-005",
    name: "Client Health Alert",
    description: "Alerts the account manager when a client's health score drops below 70.",
    trigger: "Health < 70",
    actions: ["Notify Owner", "Send Email"],
    status: "active",
    runs: 27,
    lastRun: "3d ago",
  },
];

const actionIcons: Record<string, typeof Zap> = {
  "Send Email": Mail,
  "Update Status": GitBranch,
  "Notify Owner": UserCheck,
  "Add Tag": Tag,
  "Create Task": Clock,
};

export default function AutomationsPage() {
  const [items, setItems] = useState(automations);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Automations</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            {items.filter((a) => a.status === "active").length} active workflows
          </p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="w-3.5 h-3.5" />
          New automation
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Runs", value: items.reduce((s, a) => s + a.runs, 0).toLocaleString(), color: "text-volt" },
          { label: "Active", value: items.filter((a) => a.status === "active").length, color: "text-success" },
          { label: "Paused", value: items.filter((a) => a.status === "paused").length, color: "text-warning" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="text-xs text-ink-400">{s.label}</div>
            <div className={`font-display font-700 text-2xl ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Automations list */}
      <div className="space-y-3">
        {items.map((auto, i) => (
          <div
            key={auto.id}
            className={`card p-5 transition-all duration-200 animate-fade-up ${
              auto.status === "paused" ? "opacity-60" : ""
            }`}
            style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-volt" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-600 text-ink-100 text-sm">
                    {auto.name}
                  </span>
                  <span
                    className={auto.status === "active" ? "badge-success" : "badge-warning"}
                  >
                    {auto.status === "active" ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-xs text-ink-400 mb-3">{auto.description}</p>

                {/* Flow */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge badge-neutral text-[10px]">
                    <Clock className="w-3 h-3" />
                    {auto.trigger}
                  </span>
                  <ArrowRight className="w-3 h-3 text-ink-500 flex-shrink-0" />
                  {auto.actions.map((action) => {
                    const Icon = actionIcons[action] || Zap;
                    return (
                      <span key={action} className="badge badge-volt text-[10px]">
                        <Icon className="w-3 h-3" />
                        {action}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Stats & controls */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-mono text-ink-300">{auto.runs.toLocaleString()} runs</div>
                  <div className="text-[10px] text-ink-500">Last: {auto.lastRun}</div>
                </div>
                <button
                  onClick={() => toggle(auto.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    auto.status === "active"
                      ? "bg-success/15 border border-success/30 text-success hover:bg-success/25"
                      : "bg-ink-600 border border-ink-500/40 text-ink-400 hover:text-ink-200"
                  }`}
                  title={auto.status === "active" ? "Pause" : "Resume"}
                >
                  {auto.status === "active" ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-400 hover:text-ink-200 hover:bg-ink-600 transition-all">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
