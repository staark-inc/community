"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  TrendingUp,
  Users,
  Target,
  DollarSign,
} from "lucide-react";

const periods = ["7D", "30D", "90D", "YTD"];

const kpis = [
  {
    label: "Total Revenue",
    value: "$892,400",
    change: "+18.9%",
    trend: "up",
    icon: DollarSign,
    color: "#00E5FF",
  },
  {
    label: "Leads Generated",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Target,
    color: "#00D084",
  },
  {
    label: "Conversion Rate",
    value: "24.6%",
    change: "+3.1%",
    trend: "up",
    icon: TrendingUp,
    color: "#F5A623",
  },
  {
    label: "Avg. Deal Size",
    value: "$8,420",
    change: "-1.8%",
    trend: "down",
    icon: Users,
    color: "#FF4757",
  },
];

const sources = [
  { name: "LinkedIn", count: 842, pct: 29.6, color: "#0077B5" },
  { name: "Website", count: 710, pct: 24.9, color: "#00E5FF" },
  { name: "Referral", count: 568, pct: 19.9, color: "#00D084" },
  { name: "Cold Outreach", count: 426, pct: 15.0, color: "#F5A623" },
  { name: "Email", count: 301, pct: 10.6, color: "#9B59B6" },
];

const funnel = [
  { stage: "Visitors", count: 48200, pct: 100 },
  { stage: "Leads", count: 2847, pct: 5.9 },
  { stage: "Qualified", count: 1203, pct: 2.5 },
  { stage: "Proposal", count: 486, pct: 1.0 },
  { stage: "Won", count: 237, pct: 0.49 },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenueData = [42, 58, 71, 65, 84, 92, 78, 95, 88, 102, 96, 112];
const leadsData   = [28, 34, 45, 41, 56, 62, 54, 71, 68, 80, 74, 90];

export default function AnalyticsPage() {
  const [activePeriod, setActivePeriod] = useState("30D");
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Analytics</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            Performance overview and insights.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-ink-700/60 border border-ink-500/30 rounded-xl p-1">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activePeriod === p
                  ? "bg-ink-600 text-ink-100 border border-ink-400/40"
                  : "text-ink-400 hover:text-ink-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-400">{kpi.label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${kpi.color}15`, border: `1px solid ${kpi.color}30` }}
              >
                <kpi.icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
              </div>
            </div>
            <div className="font-display font-700 text-2xl text-ink-50">{kpi.value}</div>
            <div className={`flex items-center gap-1 text-xs ${kpi.trend === "up" ? "text-success" : "text-danger"}`}>
              {kpi.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {kpi.change} vs prev period
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-600 text-ink-100">Revenue & Leads</h2>
          <div className="flex items-center gap-4 text-xs text-ink-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded-full bg-volt" />
              Revenue ($k)
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded-full bg-success" />
              Leads
            </div>
          </div>
        </div>
        <div className="h-48 flex items-end gap-2">
          {revenueData.map((val, i) => {
            const h = (val / maxRevenue) * 100;
            const lh = (leadsData[i] / Math.max(...leadsData)) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end gap-0.5 h-40">
                  <div
                    className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${h}%`, background: "rgba(0, 229, 255, 0.7)" }}
                    title={`Revenue: $${val}k`}
                  />
                  <div
                    className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${lh}%`, background: "rgba(0, 208, 132, 0.6)" }}
                    title={`Leads: ${leadsData[i]}`}
                  />
                </div>
                <span className="text-[9px] text-ink-500 font-mono">{months[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead sources */}
        <div className="card p-5">
          <h2 className="font-display font-600 text-ink-100 mb-5">Lead Sources</h2>
          <div className="space-y-3.5">
            {sources.map((src, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: src.color }} />
                    <span className="text-sm text-ink-300">{src.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-ink-400">{src.count.toLocaleString()}</span>
                    <span className="text-xs font-mono text-ink-500 w-10 text-right">{src.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-ink-600/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${src.pct}%`, background: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="card p-5">
          <h2 className="font-display font-600 text-ink-100 mb-5">Conversion Funnel</h2>
          <div className="space-y-2">
            {funnel.map((step, i) => (
              <div key={i} className="relative">
                <div
                  className="rounded-xl px-4 py-3 flex items-center justify-between"
                  style={{
                    width: `${Math.max(step.pct * 5 + 40, 100)}%`,
                    maxWidth: "100%",
                    background: `rgba(0, 229, 255, ${0.08 + (1 - i / funnel.length) * 0.12})`,
                    borderLeft: `3px solid rgba(0, 229, 255, ${0.3 + (1 - i / funnel.length) * 0.5})`,
                  }}
                >
                  <span className="text-sm text-ink-200">{step.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-medium text-ink-100">
                      {step.count.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-ink-400 w-12 text-right">
                      {step.pct}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
