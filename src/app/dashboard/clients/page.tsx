"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";

const clients = [
  {
    id: "C-001",
    name: "Nexora Systems",
    industry: "Technology",
    tier: "enterprise",
    arr: "$120,000",
    health: 94,
    contacts: 5,
    deals: 3,
    lastActivity: "Today",
    status: "active",
  },
  {
    id: "C-002",
    name: "Lumiance AI",
    industry: "Artificial Intelligence",
    tier: "growth",
    arr: "$84,000",
    health: 88,
    contacts: 3,
    deals: 2,
    lastActivity: "Yesterday",
    status: "active",
  },
  {
    id: "C-003",
    name: "Drakos Labs",
    industry: "Biotech",
    tier: "starter",
    arr: "$18,000",
    health: 72,
    contacts: 2,
    deals: 1,
    lastActivity: "3 days ago",
    status: "at_risk",
  },
  {
    id: "C-004",
    name: "Veltrix Corp",
    industry: "Finance",
    tier: "growth",
    arr: "$48,000",
    health: 81,
    contacts: 4,
    deals: 2,
    lastActivity: "1 week ago",
    status: "active",
  },
  {
    id: "C-005",
    name: "Helion Data",
    industry: "Data & Analytics",
    tier: "enterprise",
    arr: "$240,000",
    health: 97,
    contacts: 8,
    deals: 4,
    lastActivity: "Today",
    status: "active",
  },
  {
    id: "C-006",
    name: "Zenith Cloud",
    industry: "Cloud Infrastructure",
    tier: "starter",
    arr: "$9,600",
    health: 58,
    contacts: 1,
    deals: 1,
    lastActivity: "2 weeks ago",
    status: "churning",
  },
];

const tierConfig: Record<string, string> = {
  enterprise: "badge-volt",
  growth: "badge-warning",
  starter: "badge-neutral",
};

const statusConfig: Record<string, string> = {
  active: "badge-success",
  at_risk: "badge-warning",
  churning: "badge-danger",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  at_risk: "At Risk",
  churning: "Churning",
};

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "grid">("grid");

  const filtered = clients.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const healthColor = (score: number) => {
    if (score >= 85) return "#00D084";
    if (score >= 70) return "#FFB830";
    return "#FF4757";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Clients</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            {clients.length} clients · {clients.filter((c) => c.status === "active").length} active
          </p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="w-3.5 h-3.5" />
          Add client
        </button>
      </div>

      {/* Search & filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9 h-9 text-sm"
          />
        </div>
        <button className="btn-ghost text-sm">
          <Filter className="w-3.5 h-3.5" />
          Filter
        </button>
      </div>

      {/* Client cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client, i) => (
          <div
            key={client.id}
            className="card-hover p-5 cursor-pointer group animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ink-600 flex items-center justify-center text-base font-display font-700 text-ink-200">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-600 text-ink-100 text-sm">
                    {client.name}
                  </div>
                  <div className="text-xs text-ink-400">{client.industry}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`${tierConfig[client.tier]} capitalize`}>
                  {client.tier}
                </span>
                <button className="w-6 h-6 rounded-lg flex items-center justify-center text-ink-500 hover:text-ink-300 hover:bg-ink-600 transition-all opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <div className="text-[10px] text-ink-500 font-mono mb-0.5">ARR</div>
                <div className="text-sm font-mono font-medium text-ink-200">
                  {client.arr}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-ink-500 font-mono mb-0.5">Contacts</div>
                <div className="text-sm font-mono font-medium text-ink-200">
                  {client.contacts}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-ink-500 font-mono mb-0.5">Deals</div>
                <div className="text-sm font-mono font-medium text-ink-200">
                  {client.deals}
                </div>
              </div>
            </div>

            {/* Health score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-ink-500 font-mono">Health Score</span>
                <span
                  className="text-xs font-mono font-medium"
                  style={{ color: healthColor(client.health) }}
                >
                  {client.health}/100
                </span>
              </div>
              <div className="h-1.5 bg-ink-600/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${client.health}%`,
                    background: healthColor(client.health),
                    boxShadow: `0 0 8px ${healthColor(client.health)}40`,
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className={statusConfig[client.status]}>
                {statusLabels[client.status]}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-500">{client.lastActivity}</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="card p-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[10px] text-ink-500 font-mono">Total ARR</div>
            <div className="font-display font-700 text-ink-50 text-lg">$519,600</div>
          </div>
          <div className="w-px h-8 bg-ink-600/50" />
          <div>
            <div className="text-[10px] text-ink-500 font-mono">Avg Health</div>
            <div className="font-display font-700 text-success text-lg">81.7</div>
          </div>
          <div className="w-px h-8 bg-ink-600/50" />
          <div>
            <div className="text-[10px] text-ink-500 font-mono">At Risk</div>
            <div className="font-display font-700 text-warning text-lg">
              {clients.filter((c) => c.status !== "active").length}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-volt">
          <TrendingUp className="w-3.5 h-3.5" />
          +22% YoY
        </div>
      </div>
    </div>
  );
}
