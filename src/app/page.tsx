import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Globe,
  Layers,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  { value: "12k+", label: "Active Clients" },
  { value: "98%", label: "Retention Rate" },
  { value: "3.2x", label: "Average ROI" },
  { value: "< 2ms", label: "Response Time" },
];

const features = [
  {
    icon: Target,
    title: "Lead Intelligence",
    description:
      "AI-powered lead scoring and enrichment that identifies your highest-value prospects automatically.",
  },
  {
    icon: BarChart3,
    title: "Pipeline Analytics",
    description:
      "Real-time pipeline visibility with predictive forecasting and deal velocity tracking.",
  },
  {
    icon: Users,
    title: "Client Management",
    description:
      "Unified client profiles with interaction history, notes, and relationship health scoring.",
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description:
      "Trigger-based workflows that automate follow-ups, assignments, and status transitions.",
  },
  {
    icon: Globe,
    title: "Multi-Channel Tracking",
    description:
      "Capture leads from any source — web, email, social, API — into one unified inbox.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II compliant with SSO, audit logs, and granular role-based access control.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "For small teams just getting started.",
    features: [
      "Up to 500 leads/month",
      "5 team members",
      "Basic analytics",
      "Email support",
      "API access",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    description: "For scaling teams that need more power.",
    features: [
      "Up to 5,000 leads/month",
      "25 team members",
      "Advanced analytics",
      "Priority support",
      "Automation workflows",
      "Custom integrations",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with complex needs.",
    features: [
      "Unlimited leads",
      "Unlimited members",
      "Custom reporting",
      "Dedicated CSM",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

const testimonials = [
  {
    quote:
      "Staark transformed our entire sales process. Lead quality improved by 280% in the first quarter.",
    author: "Sarah Chen",
    role: "VP of Sales, Nexora",
    avatar: "SC",
  },
  {
    quote:
      "The automation engine alone saved us 15 hours per week. It's the most ROI-positive tool in our stack.",
    author: "Marcus Webb",
    role: "Head of Growth, Veltrix",
    avatar: "MW",
  },
  {
    quote:
      "Implementation was seamless. Our team was up and running in under 48 hours with full data migration.",
    author: "Priya Nair",
    role: "CRO, Lumiance",
    avatar: "PN",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink-900 grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink-600/30 backdrop-blur-md bg-ink-900/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-volt flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ink-900" />
            </div>
            <span className="font-display font-700 text-lg text-ink-50">
              staark<span className="text-volt">.</span>
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            {["Features", "Pricing", "Docs", "Blog"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm text-ink-300 hover:text-ink-100 rounded-lg hover:bg-ink-700/50 transition-all duration-200 font-medium"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary text-sm">
              Get started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden mesh-bg">
        {/* Glow orb */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-volt/8 blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-1/4 w-[200px] h-[200px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-volt/8 border border-volt/20 text-volt text-xs font-mono font-medium mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-volt animate-pulse" />
            Now with AI Lead Scoring — v2.0
          </div>

          {/* Heading */}
          <h1 className="font-display font-800 text-5xl md:text-7xl text-ink-50 leading-[0.95] tracking-tight mb-6 opacity-0 animate-fade-up stagger-1">
            Turn leads into
            <br />
            <span className="gradient-text">loyal clients.</span>
          </h1>

          <p className="text-lg md:text-xl text-ink-300 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up stagger-2">
            Staark gives your team the intelligence to find, qualify, and close
            deals faster. One platform for your entire revenue operation.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3">
            <Link href="/signup" className="btn-primary px-7 py-3 text-base">
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="btn-secondary px-7 py-3 text-base"
            >
              View demo
            </Link>
          </div>

          <p className="mt-4 text-xs text-ink-400 opacity-0 animate-fade-up stagger-4">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-5xl mx-auto mt-20 opacity-0 animate-fade-up stagger-5">
          <div className="relative rounded-2xl overflow-hidden border border-ink-500/30 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
            <div className="h-8 bg-ink-700 flex items-center gap-2 px-4 border-b border-ink-600/50">
              {["#FF5F57", "#FEBC2E", "#28C840"].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ background: color }}
                />
              ))}
              <div className="flex-1 mx-4 h-5 rounded-full bg-ink-600 max-w-xs" />
            </div>
            <div className="bg-ink-800 p-6 grid grid-cols-4 gap-4">
              {/* Mini stat cards */}
              {[
                { label: "Total Leads", value: "2,847", change: "+12.5%" },
                { label: "Qualified", value: "1,203", change: "+8.2%" },
                { label: "Conversion", value: "24.6%", change: "+3.1%" },
                { label: "Revenue", value: "$892k", change: "+18.9%" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-ink-700/80 rounded-xl p-4 border border-ink-600/40"
                >
                  <div className="text-xs text-ink-400 mb-2">{stat.label}</div>
                  <div className="font-display font-700 text-ink-50 text-xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-success mt-1">{stat.change}</div>
                </div>
              ))}
              {/* Chart placeholder */}
              <div className="col-span-3 bg-ink-700/80 rounded-xl p-4 border border-ink-600/40 h-32 flex items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 11
                            ? "#00E5FF"
                            : `rgba(0, 229, 255, ${0.2 + i * 0.05})`,
                      }}
                    />
                  )
                )}
              </div>
              <div className="bg-ink-700/80 rounded-xl p-4 border border-ink-600/40 h-32 flex flex-col justify-between">
                <div className="text-xs text-ink-400">Pipeline</div>
                {["Hot", "Warm", "Cold"].map((stage, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-danger" : i === 1 ? "bg-warning" : "bg-volt"}`}
                    />
                    <span className="text-xs text-ink-300">{stage}</span>
                    <div
                      className="flex-1 h-1.5 rounded-full bg-ink-600 ml-auto"
                      style={{ maxWidth: `${70 - i * 20}%` }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "100%",
                          background:
                            i === 0 ? "#FF4757" : i === 1 ? "#FFB830" : "#00E5FF",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-900 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-ink-600/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-800 text-3xl text-ink-50 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-ink-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-700 border border-ink-500/40 text-ink-300 text-xs font-mono mb-4">
              <Layers className="w-3 h-3" /> Platform Features
            </div>
            <h2 className="font-display font-700 text-4xl md:text-5xl text-ink-50 mb-4 tracking-tight">
              Everything you need to
              <br />
              <span className="text-volt">close more deals.</span>
            </h2>
            <p className="text-ink-300 max-w-xl mx-auto">
              A complete toolkit for modern revenue teams — from prospecting to
              closing and retention.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="card-hover p-6 group cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/20 flex items-center justify-center mb-4 group-hover:bg-volt/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-volt" />
                </div>
                <h3 className="font-display font-600 text-ink-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-ink-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-volt opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-ink-800/30 border-y border-ink-600/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-700 text-4xl text-ink-50 mb-3 tracking-tight">
              Trusted by revenue teams
            </h2>
            <p className="text-ink-300">
              Join thousands of companies already using Staark.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="text-gold text-sm">
                      ★
                    </div>
                  ))}
                </div>
                <p className="text-ink-200 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-volt/15 border border-volt/20 flex items-center justify-center text-xs font-display font-600 text-volt">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink-100">
                      {t.author}
                    </div>
                    <div className="text-xs text-ink-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-700 border border-ink-500/40 text-ink-300 text-xs font-mono mb-4">
              <TrendingUp className="w-3 h-3" /> Simple Pricing
            </div>
            <h2 className="font-display font-700 text-4xl md:text-5xl text-ink-50 mb-4 tracking-tight">
              Start free. Scale fast.
            </h2>
            <p className="text-ink-300">
              No hidden fees. No per-seat surprises. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-ink-600/60 border-volt/30 shadow-volt-glow"
                    : "bg-ink-700/40 border-ink-500/30 hover:border-ink-400/40"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-volt text-ink-900 text-xs font-display font-600">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div className="font-display font-600 text-ink-200 text-sm mb-2">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-800 text-4xl text-ink-50">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-ink-400 text-sm">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-ink-400 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-volt" : "text-success"}`}
                      />
                      <span className="text-ink-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-display font-600 text-sm transition-all duration-200 ${
                    plan.highlight
                      ? "bg-volt text-ink-900 hover:bg-volt-400 hover:shadow-volt-glow"
                      : "bg-ink-600 text-ink-100 border border-ink-400/40 hover:bg-ink-500"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-volt/8 via-transparent to-gold/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display font-800 text-4xl text-ink-50 mb-4 tracking-tight">
                Ready to grow smarter?
              </h2>
              <p className="text-ink-300 mb-8 max-w-md mx-auto">
                Join 12,000+ companies using Staark to turn their lead pipeline
                into a predictable revenue machine.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/signup" className="btn-primary px-8 py-3">
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/demo" className="btn-ghost">
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-ink-600/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-volt flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-ink-900" />
              </div>
              <span className="font-display font-700 text-ink-300">
                staark<span className="text-volt">.</span>inc
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-ink-400">
              {[
                "Privacy",
                "Terms",
                "Security",
                "Status",
                "Support",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-ink-200 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="text-xs text-ink-500">
              © {new Date().getFullYear()} Staark Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
