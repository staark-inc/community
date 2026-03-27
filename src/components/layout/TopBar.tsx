"use client";

import { Bell, Command, Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 flex-shrink-0 border-b border-ink-600/30 bg-ink-800/30 backdrop-blur-sm px-6 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
        <input
          type="text"
          placeholder="Search leads, clients..."
          className="input pl-9 pr-12 h-9 bg-ink-700/50"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-ink-500 font-mono">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-ink-400 hover:text-ink-200 hover:bg-ink-700/60 transition-all duration-200">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-volt border-2 border-ink-800" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-ink-600/50" />

        {/* Avatar */}
        <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-volt/30 to-gold/20 flex items-center justify-center border border-volt/20 hover:border-volt/35 transition-all duration-200">
          <span className="text-xs font-display font-700 text-volt">JD</span>
        </button>
      </div>
    </header>
  );
}
