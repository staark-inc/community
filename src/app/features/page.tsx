import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Layers,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Lead Intelligence",
    tagline: "Find your best prospects automatically.",
    description:
      "AI-powered lead scoring analyzes 50+ signals to rank your prospects by likelihood to convert. Stop guessing — know which leads deserve attention right now.",
    bullets: [
      "AI score updated in real-time as leads interact",
      "Enrichment from LinkedIn, Clearbit, and web data",
      "Lookalike modeling from your won deals",
    ],
  },
  {
    icon: BarChart3,
    title: "Pipeline Analytics",
    tagline: "Complete visibility into every deal.",
    description:
      "Real-time dashboards and predictive forecasting so you always know where you stand and what's at risk.",
    bullets: [
      "Deal velocity and stage duration tracking",
      "Forecast accuracy powered by ML",
      "Customizable pipeline stages and views",
    ],
  },
  {
    icon: Users,
    title: "Client Management",
    tagline: "Relationships that compound over time.",
    description:
      "Unified client profiles with health scoring, interaction history, and renewal tracking. Never let a relationship slip.",
    bullets: [
      "Health score based on engagement and usage",
      "Renewal and expansion opportunity alerts",
      "Multi-contact and stakeholder mapping",
    ],
  },
  {
    icon: Zap,
    title: "Automation Engine",
    tagline: "Work smarter, not harder.",
    description:
      "Build powerful trigger-based workflows in minutes. Automate follow-ups, lead routing, status transitions, and team notifications.",
    bullets: [
      "Visual no-code workflow builder",
      "50+ pre-built automation templates",
      "Conditional branching and time delays",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Channel Capture",
    tagline: "Every lead, everywhere.",
    description:
      "Capture leads from any source — your website, email, social media, or API — into one unified inbox. No lead left behind.",
    bullets: [
      "Embeddable web forms and chatbots",
      "Email parsing and auto-enrichment",
      "Webhook and REST API integration",
    ],
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    tagline: "Security you can rely on.",
    description:
      "SOC 2 Type II compliant with enterprise-grade access controls, audit logging, and SSO support.",
    bullets: [
      "SSO via SAML 2.0 and OIDC",
      "Granular role-based permissions",
      "Full audit log and data export",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-ink-900 grid-bg">
      {/* Nav */}
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
                  item === "Features" ? "text-volt" : "text-ink-300 hover:text-ink-100"
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-volt/8 border border-volt/20 text-volt text-xs font-mono font-medium mb-8">
          <Layers className="w-3 h-3" /> Platform Features
        </div>
        <h1 className="font-display font-800 text-5xl md:text-6xl text-ink-50 leading-tight tracking-tight mb-6 max-w-3xl mx-auto">
          Everything your revenue team needs
        </h1>
        <p className="text-lg text-ink-300 max-w-xl mx-auto mb-10">
          From first touch to closed-won, Staark covers your entire sales motion with AI-native tools.
        </p>
        <Link href="/signup" className="btn-primary px-8 py-3 text-base">
          Start free trial <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Features grid */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`card p-8 grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <div className="w-12 h-12 rounded-xl bg-volt/10 border border-volt/20 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-volt" />
                </div>
                <div className="text-xs font-mono text-volt mb-2">{feature.tagline}</div>
                <h2 className="font-display font-700 text-2xl text-ink-50 mb-3">
                  {feature.title}
                </h2>
                <p className="text-ink-300 text-sm leading-relaxed mb-5">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-ink-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-volt mt-1.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-ink-800/60 rounded-xl h-48 border border-ink-600/40 flex items-center justify-center ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}>
                <feature.icon className="w-16 h-16 text-ink-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-ink-600/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-700 text-4xl text-ink-50 mb-4">Ready to see it in action?</h2>
          <p className="text-ink-300 mb-8">Start your 14-day free trial — no credit card required.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup" className="btn-primary px-8 py-3">
              Get started free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/demo" className="btn-ghost">Book a demo</Link>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-ink-600/30 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} Staark Inc. All rights reserved.
      </footer>
    </div>
  );
}
