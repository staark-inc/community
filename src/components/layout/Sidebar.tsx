"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  ChevronDown,
  Cog,
  HelpCircle,
  LayoutDashboard,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

const navItems = [
  {
    section: "Main",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Leads",
        href: "/dashboard/leads",
        icon: Target,
        badge: "24",
      },
      {
        label: "Clients",
        href: "/dashboard/clients",
        icon: Building2,
      },
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    section: "Tools",
    items: [
      {
        label: "Team",
        href: "/dashboard/team",
        icon: Users,
      },
      {
        label: "Automations",
        href: "/dashboard/automations",
        icon: Zap,
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Cog,
      },
      {
        label: "Help & Docs",
        href: "/docs",
        icon: HelpCircle,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 flex-shrink-0 bg-ink-800/50 border-r border-ink-600/30 flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-ink-600/30">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-ink-900" />
          </div>
          <span className="font-display font-700 text-ink-50 text-lg">
            staark<span className="text-volt">.</span>
          </span>
        </Link>
      </div>

      {/* Workspace selector */}
      <div className="px-3 py-3 border-b border-ink-600/20">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-ink-700/50 transition-colors group">
          <div className="w-7 h-7 rounded-lg bg-volt/15 border border-volt/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-display font-700 text-volt">S</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-medium text-ink-100 truncate">
              Staark Inc
            </div>
            <div className="text-xs text-ink-400">Growth plan</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-ink-400 group-hover:text-ink-300" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-5 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="px-3 mb-1.5 text-[10px] font-mono font-medium text-ink-500 uppercase tracking-widest">
              {group.section}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive(item.href) ? "nav-item-active" : "nav-item"}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {"badge" in item && item.badge && (
                    <span className="text-[10px] font-mono bg-volt/15 text-volt border border-volt/20 px-1.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-ink-600/30">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-700/50 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-volt/30 to-gold/20 flex items-center justify-center border border-volt/20 flex-shrink-0">
            <span className="text-xs font-display font-700 text-volt">JD</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-medium text-ink-100 truncate">
              John Doe
            </div>
            <div className="text-xs text-ink-400 truncate">john@staark.com</div>
          </div>
          <div className="dot-active flex-shrink-0" />
        </button>
      </div>
    </aside>
  );
}
