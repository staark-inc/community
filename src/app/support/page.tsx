import Link from "next/link";
import { ArrowRight, BookOpen, MessageSquare, Mail, Phone, Sparkles } from "lucide-react";

const options = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Guides, API reference, and tutorials.",
    action: "Browse docs",
    href: "/docs",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team in real time.",
    action: "Start chat",
    href: "#chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "We reply within 4 business hours.",
    action: "Send email",
    href: "mailto:support@staarkinc.com",
  },
  {
    icon: Phone,
    title: "Priority Support",
    description: "Dedicated support for Enterprise plans.",
    action: "Contact sales",
    href: "mailto:enterprise@staarkinc.com",
  },
];

const faqs = [
  { q: "How do I import leads from a CSV file?", a: "Go to Leads → Import → Upload CSV. Our importer supports up to 50,000 rows and auto-maps common column headers." },
  { q: "Can I connect my existing CRM?", a: "Yes. We offer native integrations with Salesforce and HubSpot, plus a Zapier integration for hundreds of other tools." },
  { q: "How do I cancel my subscription?", a: "Go to Settings → Billing → Cancel Plan. Your account remains active until the end of the billing period." },
  { q: "Where is my data stored?", a: "All data is stored in AWS us-east-1 with optional EU hosting available on Enterprise plans." },
];

export default function SupportPage() {
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
          <Link href="/" className="btn-ghost text-sm">← Back to home</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center mb-14">
          <h1 className="font-display font-800 text-4xl text-ink-50 mb-3">How can we help?</h1>
          <p className="text-ink-300">Find answers or reach our support team.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {options.map((opt, i) => (
            <a key={i} href={opt.href} className="card-hover p-6 group block">
              <div className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/20 flex items-center justify-center mb-4">
                <opt.icon className="w-5 h-5 text-volt" />
              </div>
              <h2 className="font-display font-600 text-ink-100 mb-1">{opt.title}</h2>
              <p className="text-sm text-ink-400 mb-4">{opt.description}</p>
              <div className="flex items-center gap-1 text-xs text-volt">
                {opt.action} <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>

        <div>
          <h2 className="font-display font-700 text-2xl text-ink-50 mb-6">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-5">
                <h3 className="font-display font-600 text-ink-100 text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
