import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Clock,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Target,
    color: "volt",
  },
  {
    label: "Active Clients",
    value: "438",
    change: "+4.2%",
    trend: "up",
    icon: Building2,
    color: "success",
  },
  {
    label: "Conversion Rate",
    value: "24.6%",
    change: "+3.1%",
    trend: "up",
    icon: TrendingUp,
    color: "gold",
  },
  {
    label: "Avg. Deal Size",
    value: "$8,420",
    change: "-1.8%",
    trend: "down",
    icon: Users,
    color: "warning",
  },
];

const recentLeads = [
  {
    id: "L-001",
    name: "Nexora Systems",
    contact: "Sarah Chen",
    source: "LinkedIn",
    status: "qualified",
    value: "$24,000",
    time: "2m ago",
  },
  {
    id: "L-002",
    name: "Veltrix Corp",
    contact: "Marcus Webb",
    source: "Referral",
    status: "new",
    value: "$8,500",
    time: "18m ago",
  },
  {
    id: "L-003",
    name: "Lumiance AI",
    contact: "Priya Nair",
    source: "Website",
    status: "contacted",
    value: "$42,000",
    time: "1h ago",
  },
  {
    id: "L-004",
    name: "Drakos Labs",
    contact: "Tyler Fox",
    source: "Email",
    status: "proposal",
    value: "$15,200",
    time: "3h ago",
  },
  {
    id: "L-005",
    name: "Meridian Tech",
    contact: "Amy Park",
    source: "Cold Outreach",
    status: "lost",
    value: "$6,000",
    time: "5h ago",
  },
];

const pipeline = [
  { stage: "New", count: 84, value: "$320k", color: "#5E6278" },
  { stage: "Contacted", count: 62, value: "$248k", color: "#00E5FF" },
  { stage: "Qualified", count: 41, value: "$312k", color: "#F5A623" },
  { stage: "Proposal", count: 28, value: "$480k", color: "#9B59B6" },
  { stage: "Won", count: 18, value: "$640k", color: "#00D084" },
];

const statusMap: Record<
  string,
  { label: string; className: string }
> = {
  new: { label: "New", className: "badge-neutral" },
  contacted: { label: "Contacted", className: "badge-volt" },
  qualified: { label: "Qualified", className: "badge-success" },
  proposal: { label: "Proposal", className: "badge-warning" },
  lost: { label: "Lost", className: "badge-danger" },
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">
            Good morning, John 👋
          </h1>
          <p className="text-sm text-ink-400 mt-0.5">
            Here&apos;s what&apos;s happening with your pipeline today.
          </p>
        </div>
        <Link href="/dashboard/leads/new" className="btn-primary text-sm">
          Add lead
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card group animate-fade-up" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
            <div className="flex items-center justify-between">
              <div className="text-xs text-ink-400 font-medium">{stat.label}</div>
              <div className="w-8 h-8 rounded-lg bg-ink-600/80 flex items-center justify-center group-hover:bg-ink-500/80 transition-colors">
                <stat.icon className="w-3.5 h-3.5 text-ink-300" />
              </div>
            </div>
            <div className="font-display font-700 text-2xl text-ink-50">
              {stat.value}
            </div>
            <div className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-success" : "text-danger"}`}>
              {stat.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stat.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent leads */}
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink-600/30">
            <h2 className="font-display font-600 text-ink-100">Recent Leads</h2>
            <Link
              href="/dashboard/leads"
              className="text-xs text-volt hover:text-volt-300 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-ink-600/20">
            {recentLeads.map((lead, i) => {
              const status = statusMap[lead.status];
              return (
                <div
                  key={lead.id}
                  className="px-6 py-3.5 flex items-center gap-4 hover:bg-ink-700/30 transition-colors cursor-pointer group"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-lg bg-ink-600 flex items-center justify-center text-xs font-display font-600 text-ink-200 flex-shrink-0">
                    {lead.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ink-100 truncate">
                        {lead.name}
                      </span>
                      <span className="text-xs text-ink-500 font-mono">{lead.id}</span>
                    </div>
                    <div className="text-xs text-ink-400 truncate">
                      {lead.contact} · {lead.source}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-sm font-mono font-medium text-ink-200 hidden sm:block">
                    {lead.value}
                  </div>

                  {/* Status */}
                  <span className={status.className}>{status.label}</span>

                  {/* Time */}
                  <div className="flex items-center gap-1 text-xs text-ink-500 hidden md:flex flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {lead.time}
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="w-4 h-4 text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline stages */}
        <div className="card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-600 text-ink-100">Pipeline</h2>
            <span className="text-xs text-ink-400 font-mono">This month</span>
          </div>
          <div className="flex-1 space-y-3">
            {pipeline.map((stage, i) => {
              const maxCount = Math.max(...pipeline.map((p) => p.count));
              const width = (stage.count / maxCount) * 100;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-ink-300">
                      {stage.stage}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-ink-400">
                        {stage.count}
                      </span>
                      <span className="text-xs font-mono text-ink-500">
                        {stage.value}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-ink-600/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${width}%`,
                        background: stage.color,
                        boxShadow: `0 0 8px ${stage.color}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-ink-600/30">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-400">Total pipeline value</span>
              <span className="font-mono font-medium text-ink-100">$2.0M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity chart placeholder */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-600 text-ink-100">Lead Activity</h2>
          <div className="flex items-center gap-2">
            {["7D", "30D", "90D"].map((period, i) => (
              <button
                key={period}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  i === 1
                    ? "bg-ink-600 text-ink-100 border border-ink-500/40"
                    : "text-ink-400 hover:text-ink-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        {/* Chart bars — static seeded data to avoid hydration mismatch */}
        <div className="h-36 flex items-end gap-1.5">
          {[38,55,42,67,74,51,63,80,58,71,45,88,62,76,53,69,84,48,72,91,65,78,56,83,70,95,68,87,74,100].map(
            (h, i) => {
              const isHighlighted = i > 24;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-200 hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${h}%`,
                    background: isHighlighted
                      ? "#00E5FF"
                      : "rgba(0, 229, 255, 0.2)",
                  }}
                />
              );
            }
          )}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-ink-500 font-mono">
          <span>Jun 1</span>
          <span>Jun 10</span>
          <span>Jun 20</span>
          <span>Jun 30</span>
        </div>
      </div>
    </div>
  );
}
