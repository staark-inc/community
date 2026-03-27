import Link from "next/link";
import { Sparkles } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us for support. This includes name, email address, company name, and billing information. We also collect usage data automatically, such as pages visited, features used, and device information.",
  },
  {
    title: "How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations. We do not sell your personal information to third parties.",
  },
  {
    title: "Data Sharing",
    body: "We may share your information with trusted third-party service providers who assist us in operating our platform (such as cloud hosting, email delivery, and payment processing). These providers are contractually bound to protect your data and may only use it to provide services to us.",
  },
  {
    title: "Data Retention",
    body: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support@staarkinc.com.",
  },
  {
    title: "Security",
    body: "We implement industry-standard security measures including TLS encryption in transit, AES-256 encryption at rest, and SOC 2 Type II certified infrastructure. We perform regular security audits and penetration tests.",
  },
  {
    title: "Your Rights",
    body: "Depending on your location, you may have the right to access, correct, or delete your personal information, object to processing, and data portability. To exercise these rights, contact us at privacy@staarkinc.com.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice in the application at least 30 days before the change takes effect.",
  },
];

export default function PrivacyPage() {
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
          <h1 className="font-display font-800 text-4xl text-ink-50 mb-3">Privacy Policy</h1>
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
            Questions about this policy? Contact us at{" "}
            <a href="mailto:privacy@staarkinc.com" className="text-volt hover:text-volt-400 transition-colors">
              privacy@staarkinc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
