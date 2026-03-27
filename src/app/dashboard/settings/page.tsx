"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  Moon,
  Save,
  Shield,
  Users,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: Users },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "integrations", label: "Integrations", icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="font-display font-700 text-2xl text-ink-50">Settings</h1>
        <p className="text-sm text-ink-400 mt-0.5">
          Manage your account and workspace preferences.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <aside className="w-48 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id ? "nav-item-active w-full" : "nav-item w-full"
                }
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {activeTab === "profile" && (
            <>
              <div className="card p-6 space-y-5">
                <h2 className="font-display font-600 text-ink-100">Profile</h2>

                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-volt/30 to-gold/20 flex items-center justify-center border border-volt/20">
                    <span className="font-display font-700 text-xl text-volt">JD</span>
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Change avatar</button>
                    <p className="text-xs text-ink-500 mt-1.5">
                      JPG, PNG or GIF · Max 2MB
                    </p>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">
                      First name
                    </label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">
                      Last name
                    </label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@staark.com"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Job title
                  </label>
                  <input
                    type="text"
                    defaultValue="Sales Manager"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Timezone
                  </label>
                  <select className="input text-sm">
                    <option>Europe/Bucharest (UTC+3)</option>
                    <option>America/New_York (UTC-4)</option>
                    <option>Europe/London (UTC+1)</option>
                  </select>
                </div>
              </div>

              <div className="card p-6 space-y-4">
                <h2 className="font-display font-600 text-ink-100">Workspace</h2>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Company name
                  </label>
                  <input
                    type="text"
                    defaultValue="Staark Inc"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Website
                  </label>
                  <input
                    type="url"
                    defaultValue="https://staarkinc.com"
                    className="input"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="btn-primary text-sm">
                  <Save className="w-3.5 h-3.5" />
                  Save changes
                </button>
              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <div className="card p-6 space-y-5">
              <h2 className="font-display font-600 text-ink-100">Notifications</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "New lead assigned",
                    description: "When a lead is assigned to you",
                    defaultOn: true,
                  },
                  {
                    title: "Lead status change",
                    description: "When a lead status is updated",
                    defaultOn: true,
                  },
                  {
                    title: "Deal closed",
                    description: "When a deal is marked as won or lost",
                    defaultOn: true,
                  },
                  {
                    title: "Weekly digest",
                    description: "Summary of pipeline activity each Monday",
                    defaultOn: false,
                  },
                  {
                    title: "Client health alerts",
                    description: "When a client health score drops below 70",
                    defaultOn: true,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-ink-600/20 last:border-0"
                  >
                    <div>
                      <div className="text-sm font-medium text-ink-100">
                        {item.title}
                      </div>
                      <div className="text-xs text-ink-400">
                        {item.description}
                      </div>
                    </div>
                    <div
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                        item.defaultOn ? "bg-volt" : "bg-ink-600"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                          item.defaultOn ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-5">
              <div className="card p-6 space-y-4">
                <h2 className="font-display font-600 text-ink-100">Password</h2>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Current password
                  </label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    New password
                  </label>
                  <input type="password" className="input" placeholder="Min. 8 characters" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Confirm password
                  </label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <button className="btn-primary text-sm">Update password</button>
              </div>

              <div className="card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-display font-600 text-ink-100 mb-1">
                      Two-factor authentication
                    </h2>
                    <p className="text-sm text-ink-400">
                      Add an extra layer of security to your account.
                    </p>
                  </div>
                  <span className="badge-danger">Disabled</span>
                </div>
                <button className="btn-secondary text-sm mt-4">
                  <Shield className="w-3.5 h-3.5" />
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-5">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-600 text-ink-100">
                    Current Plan
                  </h2>
                  <span className="badge-volt">Growth</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display font-700 text-3xl text-ink-50">
                    $149
                  </span>
                  <span className="text-ink-400 text-sm">/month</span>
                </div>
                <p className="text-sm text-ink-400 mb-5">
                  Next billing date: July 1, 2025
                </p>
                <div className="flex items-center gap-3">
                  <button className="btn-primary text-sm">Upgrade to Enterprise</button>
                  <button className="btn-ghost text-sm text-danger">Cancel plan</button>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="font-display font-600 text-ink-100 mb-4">
                  Payment Method
                </h2>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-ink-500/40 bg-ink-700/30">
                  <CreditCard className="w-5 h-5 text-ink-300" />
                  <div className="flex-1">
                    <div className="text-sm text-ink-200">Visa ending in 4242</div>
                    <div className="text-xs text-ink-400">Expires 12/2026</div>
                  </div>
                  <button className="text-xs text-volt hover:text-volt-400 transition-colors">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
