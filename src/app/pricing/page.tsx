import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

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

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — every plan starts with a 14-day free trial. No credit card required.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time from your billing settings.",
  },
  {
    q: "What counts as a lead?",
    a: "Any contact record created or imported in a given calendar month.",
  },
  {
    q: "Do you offer annual pricing?",
    a: "Yes — pay annually and save 20% on any plan. Contact us to switch.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-ink-900 grid-bg">
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
                  item === "Pricing" ? "text-volt" : "text-ink-300 hover:text-ink-100"
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

      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="font-display font-800 text-5xl md:text-6xl text-ink-50 tracking-tight mb-4">
          Start free. Scale fast.
        </h1>
        <p className="text-ink-300 text-lg mb-12">
          No hidden fees. No per-seat surprises. Cancel anytime.
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
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
                <div className="font-display font-600 text-ink-200 text-sm mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-800 text-4xl text-ink-50">{plan.price}</span>
                  {plan.period && <span className="text-ink-400 text-sm">{plan.period}</span>}
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
                    ? "bg-volt text-ink-900 hover:bg-volt-400"
                    : "bg-ink-600 text-ink-100 border border-ink-400/40 hover:bg-ink-500"
                }`}
              >
                {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-ink-600/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-700 text-3xl text-ink-50 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-5">
                <h3 className="font-display font-600 text-ink-100 mb-2">{faq.q}</h3>
                <p className="text-sm text-ink-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-ink-600/30 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} Staark Inc. All rights reserved.
      </footer>
    </div>
  );
}
