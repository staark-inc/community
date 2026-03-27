import Link from "next/link";
import { Sparkles } from "lucide-react";

const services = [
  { name: "API", status: "operational", latency: "18ms" },
  { name: "Web App", status: "operational", latency: "42ms" },
  { name: "Webhooks", status: "operational", latency: "67ms" },
  { name: "Automation Engine", status: "operational", latency: "95ms" },
  { name: "Email Delivery", status: "operational", latency: "220ms" },
  { name: "Database", status: "operational", latency: "8ms" },
];

const incidents = [
  {
    date: "Jun 12, 2025",
    title: "Elevated API latency",
    severity: "minor",
    resolved: true,
    description: "Increased p99 latency on the /leads API between 14:20–15:05 UTC. Root cause: database connection pool exhaustion during a bulk import job. Resolved by scaling connection limits.",
  },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  operational: { label: "Operational", color: "text-success", dot: "bg-success" },
  degraded: { label: "Degraded", color: "text-warning", dot: "bg-warning" },
  outage: { label: "Outage", color: "text-danger", dot: "bg-danger" },
};

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen bg-ink-900 grid-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink-600/30 backdrop-blur-md bg-ink-900/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ink-900" />
            </div>
            <span className="font-display font-700 text-lg text-ink-50">staark<span className="text-volt">.</span></span>
          </Link>
          <Link href="/" className="btn-ghost text-sm">← Back to home</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 space-y-8">
        {/* Overall status */}
        <div className={`card p-8 text-center ${allOperational ? "border-success/20 bg-success/5" : "border-warning/20 bg-warning/5"}`}>
          <div className={`w-4 h-4 rounded-full mx-auto mb-4 ${allOperational ? "bg-success shadow-[0_0_12px_rgba(0,208,132,0.5)]" : "bg-warning"}`} />
          <h1 className="font-display font-700 text-2xl text-ink-50 mb-1">
            {allOperational ? "All systems operational" : "Partial service disruption"}
          </h1>
          <p className="text-sm text-ink-400">Last updated: {new Date().toUTCString()}</p>
        </div>

        {/* Services */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-ink-600/30">
            <h2 className="font-display font-600 text-ink-100">Services</h2>
          </div>
          <div className="divide-y divide-ink-600/20">
            {services.map((svc, i) => {
              const cfg = statusConfig[svc.status];
              return (
                <div key={i} className="px-6 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${cfg.dot} shadow-[0_0_6px_currentColor]`} />
                    <span className="text-sm text-ink-200">{svc.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-ink-500">{svc.latency}</span>
                    <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uptime bars */}
        <div className="card p-6">
          <h2 className="font-display font-600 text-ink-100 mb-4">90-Day Uptime</h2>
          <div className="space-y-3">
            {services.slice(0, 3).map((svc, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink-400">{svc.name}</span>
                  <span className="text-success font-mono">99.97%</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 90 }, (_, j) => (
                    <div
                      key={j}
                      className="flex-1 h-6 rounded-sm"
                      style={{ background: j === 51 ? "#FFB830" : "#00D084", opacity: j === 51 ? 0.7 : 0.5 }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-ink-600/30">
            <h2 className="font-display font-600 text-ink-100">Recent Incidents</h2>
          </div>
          {incidents.map((inc, i) => (
            <div key={i} className="px-6 py-5 border-b border-ink-600/20 last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-warning">{inc.severity}</span>
                <span className="badge-success">Resolved</span>
                <span className="text-xs text-ink-500 ml-auto">{inc.date}</span>
              </div>
              <h3 className="font-display font-600 text-ink-100 text-sm mb-1">{inc.title}</h3>
              <p className="text-xs text-ink-400 leading-relaxed">{inc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
