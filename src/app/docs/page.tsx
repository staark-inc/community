import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Sparkles, Zap, Globe, Shield } from "lucide-react";

const sections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Set up your workspace and import your first leads in under 10 minutes.",
    links: ["Quick start guide", "Invite your team", "Import leads via CSV", "Connect your CRM"],
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Full REST API for leads, clients, automations, and webhooks.",
    links: ["Authentication", "Leads API", "Clients API", "Webhooks"],
  },
  {
    icon: Zap,
    title: "Automations",
    description: "Build trigger-based workflows to automate repetitive tasks.",
    links: ["Triggers overview", "Actions library", "Conditional logic", "Templates"],
  },
  {
    icon: Globe,
    title: "Integrations",
    description: "Connect Staark with the tools your team already uses.",
    links: ["Salesforce", "HubSpot", "Slack", "Zapier"],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "SOC 2 Type II, GDPR, SSO, and audit logging documentation.",
    links: ["Security overview", "GDPR compliance", "SSO setup", "Audit logs"],
  },
];

export default function DocsPage() {
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
          <div className="hidden md:flex items-center gap-1">
            {["Features", "Pricing", "Docs", "Blog"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className={`px-4 py-2 text-sm rounded-lg hover:bg-ink-700/50 transition-all duration-200 font-medium ${item === "Docs" ? "text-volt" : "text-ink-300 hover:text-ink-100"}`}>
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
            <Link href="/signup" className="btn-primary text-sm">Get started <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="font-display font-800 text-5xl text-ink-50 tracking-tight mb-4">Documentation</h1>
        <p className="text-ink-300 text-lg max-w-xl mx-auto">Everything you need to build with Staark.</p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <div key={i} className="card-hover p-6 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/20 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-volt" />
              </div>
              <h2 className="font-display font-600 text-ink-50 mb-2">{s.title}</h2>
              <p className="text-sm text-ink-400 mb-4 leading-relaxed">{s.description}</p>
              <ul className="space-y-1.5">
                {s.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-ink-300 hover:text-volt flex items-center gap-1.5 transition-colors">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-ink-600/30 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} Staark Inc. All rights reserved.
      </footer>
    </div>
  );
}
