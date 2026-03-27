import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface MarketingNavProps {
  active?: string;
}

export function MarketingNav({ active }: MarketingNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink-600/30 backdrop-blur-md bg-ink-900/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-ink-900" />
          </div>
          <span className="font-display font-700 text-lg text-ink-50">
            staark<span className="text-volt">.</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {["Features", "Pricing", "Docs", "Blog"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`px-4 py-2 text-sm rounded-lg hover:bg-ink-700/50 transition-all duration-200 font-medium ${
                active === item ? "text-volt" : "text-ink-300 hover:text-ink-100"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
          <Link href="/signup" className="btn-primary text-sm">
            Get started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function MarketingFooter() {
  return (
    <footer className="py-12 px-6 border-t border-ink-600/30">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-volt flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-ink-900" />
          </div>
          <span className="font-display font-700 text-ink-300">staark<span className="text-volt">.</span>inc</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink-400">
          {["Privacy", "Terms", "Security", "Status", "Support"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-ink-200 transition-colors">
              {item}
            </Link>
          ))}
        </div>
        <div className="text-xs text-ink-500">© {new Date().getFullYear()} Staark Inc.</div>
      </div>
    </footer>
  );
}
