import Link from "next/link";
import { Sparkles } from "lucide-react";

const sections = [
  { title: "Acceptance of Terms", body: "By accessing or using Staark Inc. services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use our services." },
  { title: "Use of Service", body: "You may use Staark only for lawful purposes and in accordance with these terms. You agree not to use the service to transmit any unlawful, harmful, or offensive content, to impersonate any person or entity, or to interfere with the proper functioning of the service." },
  { title: "Accounts", body: "You are responsible for safeguarding your account credentials and for all activities that occur under your account. Notify us immediately at security@staarkinc.com if you suspect unauthorized access to your account." },
  { title: "Subscriptions and Billing", body: "Paid subscriptions are billed in advance on a monthly or annual basis. You authorize us to charge your payment method for all fees incurred. Subscriptions auto-renew unless cancelled at least 24 hours before the renewal date." },
  { title: "Data Ownership", body: "You retain all rights to data you upload or create within Staark. We do not claim ownership of your data. Upon account termination, you may export your data within 30 days before it is permanently deleted." },
  { title: "Limitation of Liability", body: "To the maximum extent permitted by law, Staark Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service." },
  { title: "Governing Law", body: "These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions." },
];

export default function TermsPage() {
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
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-10">
          <h1 className="font-display font-800 text-4xl text-ink-50 mb-3">Terms of Service</h1>
          <p className="text-ink-400 text-sm">Last updated: June 1, 2025</p>
        </div>
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-display font-600 text-ink-100 text-lg mb-3">{s.title}</h2>
              <p className="text-ink-300 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 card p-6">
          <p className="text-sm text-ink-300">
            Questions? Contact us at{" "}
            <a href="mailto:legal@staarkinc.com" className="text-volt hover:text-volt-400 transition-colors">
              legal@staarkinc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
