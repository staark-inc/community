"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
  Download,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const leads = [
  {
    id: "L-001",
    company: "Nexora Systems",
    contact: "Sarah Chen",
    email: "sarah@nexora.com",
    phone: "+1 (555) 0101",
    source: "LinkedIn",
    status: "qualified",
    score: 92,
    value: "$24,000",
    owner: "JD",
    lastActivity: "2m ago",
    tags: ["Enterprise", "Hot"],
  },
  {
    id: "L-002",
    company: "Veltrix Corp",
    contact: "Marcus Webb",
    email: "m.webb@veltrix.io",
    phone: "+1 (555) 0202",
    source: "Referral",
    status: "new",
    score: 67,
    value: "$8,500",
    owner: "AK",
    lastActivity: "18m ago",
    tags: ["SMB"],
  },
  {
    id: "L-003",
    company: "Lumiance AI",
    contact: "Priya Nair",
    email: "priya@lumiance.ai",
    phone: "+1 (555) 0303",
    source: "Website",
    status: "contacted",
    score: 85,
    value: "$42,000",
    owner: "JD",
    lastActivity: "1h ago",
    tags: ["Enterprise", "AI"],
  },
  {
    id: "L-004",
    company: "Drakos Labs",
    contact: "Tyler Fox",
    email: "tyler@drakosl.com",
    phone: "+1 (555) 0404",
    source: "Cold Outreach",
    status: "proposal",
    score: 78,
    value: "$15,200",
    owner: "MR",
    lastActivity: "3h ago",
    tags: ["Mid-Market"],
  },
  {
    id: "L-005",
    company: "Meridian Tech",
    contact: "Amy Park",
    email: "amy.p@meridian.tech",
    phone: "+1 (555) 0505",
    source: "Email",
    status: "lost",
    score: 45,
    value: "$6,000",
    owner: "AK",
    lastActivity: "5h ago",
    tags: ["SMB"],
  },
  {
    id: "L-006",
    company: "Helion Data",
    contact: "Robert Kim",
    email: "r.kim@helion.com",
    phone: "+1 (555) 0606",
    source: "LinkedIn",
    status: "qualified",
    score: 88,
    value: "$31,500",
    owner: "JD",
    lastActivity: "1d ago",
    tags: ["Enterprise"],
  },
  {
    id: "L-007",
    company: "Pulse Analytics",
    contact: "Elena Russo",
    email: "elena@pulseanalytics.co",
    phone: "+1 (555) 0707",
    source: "Website",
    status: "contacted",
    score: 71,
    value: "$12,000",
    owner: "MR",
    lastActivity: "1d ago",
    tags: ["Mid-Market"],
  },
  {
    id: "L-008",
    company: "Zenith Cloud",
    contact: "Jake Morrison",
    email: "jake@zenithcloud.io",
    phone: "+1 (555) 0808",
    source: "Referral",
    status: "new",
    score: 55,
    value: "$9,800",
    owner: "AK",
    lastActivity: "2d ago",
    tags: ["Cloud", "SMB"],
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "badge-neutral" },
  contacted: { label: "Contacted", className: "badge-volt" },
  qualified: { label: "Qualified", className: "badge-success" },
  proposal: { label: "Proposal", className: "badge-warning" },
  won: { label: "Won", className: "badge-success" },
  lost: { label: "Lost", className: "badge-danger" },
};

const filterStatuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = leads.filter((lead) => {
    const matchSearch =
      !search ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      activeFilter === "All" ||
      lead.status === activeFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((l) => l.id));
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Leads</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            {leads.length} total leads · {leads.filter((l) => l.status === "qualified").length} qualified
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary text-sm">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <Link href="/dashboard/leads/new" className="btn-primary text-sm">
            <Plus className="w-3.5 h-3.5" />
            Add lead
          </Link>
        </div>
      </div>

      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9 h-9 text-sm"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1 flex-wrap">
          {filterStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeFilter === status
                  ? "bg-ink-600 text-ink-100 border border-ink-400/40"
                  : "text-ink-400 hover:text-ink-200 hover:bg-ink-700/40"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* More filters */}
        <button className="btn-ghost text-sm ml-auto flex-shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Bulk actions bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-volt/10 border border-volt/20 animate-fade-in">
          <span className="text-sm font-medium text-volt">
            {selected.length} selected
          </span>
          <div className="w-px h-4 bg-volt/20" />
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-sm text-ink-300">
              <UserCheck className="w-3.5 h-3.5" />
              Assign
            </button>
            <button className="btn-ghost text-sm text-ink-300">
              <Mail className="w-3.5 h-3.5" />
              Email
            </button>
            <button className="btn-ghost text-sm text-danger">
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-600/30">
                <th className="text-left px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="rounded border-ink-500 bg-ink-700 text-volt focus:ring-volt/30 w-4 h-4"
                  />
                </th>
                {[
                  ["Company", true],
                  ["Contact", true],
                  ["Source", false],
                  ["Status", false],
                  ["Score", true],
                  ["Value", true],
                  ["Owner", false],
                  ["Activity", true],
                  ["", false],
                ].map(([label, sortable], i) => (
                  <th
                    key={i}
                    className="text-left px-3 py-3 text-[11px] font-mono font-medium text-ink-400 uppercase tracking-wide whitespace-nowrap"
                  >
                    {label && (
                      <button className="flex items-center gap-1 hover:text-ink-200 transition-colors">
                        {label}
                        {sortable && (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => {
                const status = statusConfig[lead.status];
                const isSelected = selected.includes(lead.id);
                return (
                  <tr
                    key={lead.id}
                    className={`border-b border-ink-600/15 table-row-hover ${
                      isSelected ? "bg-volt/5" : ""
                    } animate-fade-in`}
                    style={{ animationDelay: `${i * 0.03}s`, opacity: 0 }}
                  >
                    {/* Checkbox */}
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(lead.id)}
                        className="rounded border-ink-500 bg-ink-700 text-volt focus:ring-volt/30 w-4 h-4"
                      />
                    </td>

                    {/* Company */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-ink-600 flex items-center justify-center text-xs font-display font-600 text-ink-200 flex-shrink-0">
                          {lead.company.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-ink-100 whitespace-nowrap">
                            {lead.company}
                          </div>
                          <div className="text-[10px] text-ink-500 font-mono">
                            {lead.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-3 py-3">
                      <div className="text-sm text-ink-200">{lead.contact}</div>
                      <div className="text-xs text-ink-400 truncate max-w-[160px]">
                        {lead.email}
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-3 py-3">
                      <span className="text-sm text-ink-400">{lead.source}</span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <span className={status.className}>{status.label}</span>
                    </td>

                    {/* Score */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-ink-600/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${lead.score}%`,
                              background:
                                lead.score >= 80
                                  ? "#00D084"
                                  : lead.score >= 60
                                    ? "#FFB830"
                                    : "#FF4757",
                            }}
                          />
                        </div>
                        <span className={`text-xs font-mono font-medium ${scoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </div>
                    </td>

                    {/* Value */}
                    <td className="px-3 py-3">
                      <span className="text-sm font-mono font-medium text-ink-200">
                        {lead.value}
                      </span>
                    </td>

                    {/* Owner */}
                    <td className="px-3 py-3">
                      <div className="w-7 h-7 rounded-full bg-ink-600 flex items-center justify-center text-[10px] font-display font-600 text-ink-200">
                        {lead.owner}
                      </div>
                    </td>

                    {/* Activity */}
                    <td className="px-3 py-3">
                      <span className="text-xs text-ink-400 whitespace-nowrap">
                        {lead.lastActivity}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-400 hover:text-ink-200 hover:bg-ink-600 transition-all">
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-400 hover:text-ink-200 hover:bg-ink-600 transition-all">
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-400 hover:text-ink-200 hover:bg-ink-600 transition-all">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-ink-600/30">
          <span className="text-xs text-ink-400">
            Showing {filtered.length} of {leads.length} leads
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 12].map((page, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  page === 1
                    ? "bg-ink-600 text-ink-100 border border-ink-400/40"
                    : "text-ink-400 hover:text-ink-200 hover:bg-ink-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
