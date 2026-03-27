"use client";

import { useState } from "react";
import {
  Crown,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  User,
} from "lucide-react";

const members = [
  {
    id: "U-001",
    name: "John Doe",
    email: "john@staark.com",
    role: "admin",
    status: "active",
    leads: 42,
    deals: 18,
    avatar: "JD",
    joined: "Jan 2024",
  },
  {
    id: "U-002",
    name: "Amy Kim",
    email: "amy@staark.com",
    role: "member",
    status: "active",
    leads: 31,
    deals: 12,
    avatar: "AK",
    joined: "Mar 2024",
  },
  {
    id: "U-003",
    name: "Marcus Rivera",
    email: "marcus@staark.com",
    role: "member",
    status: "active",
    leads: 27,
    deals: 9,
    avatar: "MR",
    joined: "Apr 2024",
  },
  {
    id: "U-004",
    name: "Priya Shah",
    email: "priya@staark.com",
    role: "viewer",
    status: "invited",
    leads: 0,
    deals: 0,
    avatar: "PS",
    joined: "Invited",
  },
];

const roleConfig: Record<string, { label: string; className: string; icon: typeof User }> = {
  admin: { label: "Admin", className: "badge-volt", icon: Crown },
  member: { label: "Member", className: "badge-neutral", icon: User },
  viewer: { label: "Viewer", className: "badge-warning", icon: Shield },
};

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  const filtered = members.filter(
    (m) =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-2xl text-ink-50">Team</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            {members.length} members · {members.filter((m) => m.status === "active").length} active
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="btn-primary text-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Invite member
        </button>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/80 backdrop-blur-sm animate-fade-in">
          <div className="card p-7 w-full max-w-md space-y-5 animate-fade-up" style={{ opacity: 0 }}>
            <div>
              <h2 className="font-display font-600 text-ink-50 text-lg">Invite teammate</h2>
              <p className="text-sm text-ink-400 mt-1">
                They&apos;ll receive an email with a link to join your workspace.
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Email address</label>
              <input type="email" placeholder="colleague@company.com" className="input" />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Role</label>
              <select className="input text-sm">
                <option value="member">Member — can manage leads & clients</option>
                <option value="viewer">Viewer — read-only access</option>
                <option value="admin">Admin — full workspace access</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button className="btn-primary text-sm flex-1 justify-center">
                <Mail className="w-3.5 h-3.5" />
                Send invite
              </button>
              <button
                onClick={() => setShowInvite(false)}
                className="btn-ghost text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400" />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-9 h-9 text-sm"
        />
      </div>

      {/* Members list */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-600/30">
                {["Member", "Role", "Status", "Leads", "Deals Closed", "Joined", ""].map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-5 py-3 text-[11px] font-mono font-medium text-ink-400 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => {
                const role = roleConfig[member.role];
                const RoleIcon = role.icon;
                return (
                  <tr
                    key={member.id}
                    className="border-b border-ink-600/15 table-row-hover animate-fade-in"
                    style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-volt/20 to-gold/10 border border-volt/20 flex items-center justify-center text-xs font-display font-700 text-volt flex-shrink-0">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-ink-100">{member.name}</div>
                          <div className="text-xs text-ink-400">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={role.className}>
                        <RoleIcon className="w-3 h-3" />
                        {role.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={member.status === "active" ? "badge-success" : "badge-warning"}>
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-mono text-ink-300">{member.leads}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-mono text-ink-300">{member.deals}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-ink-400">{member.joined}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-400 hover:text-ink-200 hover:bg-ink-600 transition-all">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan info */}
      <div className="card p-5 flex items-center justify-between">
        <div className="text-sm text-ink-300">
          Using <span className="text-ink-100 font-medium">{members.length}</span> of{" "}
          <span className="text-ink-100 font-medium">25</span> seats on your Growth plan.
        </div>
        <button className="btn-secondary text-xs">Upgrade for more seats</button>
      </div>
    </div>
  );
}
