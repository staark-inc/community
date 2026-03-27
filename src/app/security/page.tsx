import Link from "next/link";
import { CheckCircle2, Lock, Server, Shield, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "SOC 2 Type II Certified",
    description: "Our infrastructure and processes are independently audited annually against the AICPA Trust Service Criteria.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data is encrypted in transit with TLS 1.3 and at rest with AES-256. Encryption keys are managed with hardware security modules.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Hosted on AWS with VPC isolation, private subnets, WAF protection, and automatic DDoS mitigation via CloudFront.",
  },
];

const practices = [
  "Role-based access control (RBAC) with least-privilege defaults",
  "Single sign-on (SSO) via SAML 2.0 and OIDC",
  "Multi-factor authentication (MFA) enforced for all team members",
  "Full audit log of all user actions and data access",
  "Automated dependency scanning and vulnerability patching",
  "Penetration testing by third parties twice per year",
  "99.9% uptime SLA with multi-region failover",
  "GDPR and CCPA compliant data handling",
];

export default function SecurityPage() {
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
        <div className="text-center mb-16">
          <h1 className="font-display font-800 text-4xl text-ink-50 mb-4">Security</h1>
          <p className="text-ink-300 text-lg max-w-xl mx-auto">
            Your data security is our top priority. Here&apos;s how we protect it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {pillars.map((p, i) => (
            <div key={i} className="card p-6">
              <div className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/20 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-volt" />
              </div>
              <h2 className="font-display font-600 text-ink-100 mb-2">{p.title}</h2>
              <p className="text-sm text-ink-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="card p-7">
          <h2 className="font-display font-600 text-ink-100 text-lg mb-5">Security Practices</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {practices.map((practice, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span className="text-sm text-ink-300">{practice}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 card p-6 flex items-center justify-between">
          <div>
            <div className="font-display font-600 text-ink-100 mb-1">Found a vulnerability?</div>
            <p className="text-sm text-ink-400">We have a responsible disclosure program. Report issues to our security team.</p>
          </div>
          <a href="mailto:security@staarkinc.com" className="btn-primary text-sm flex-shrink-0">
            Report issue
          </a>
        </div>
      </div>
    </div>
  );
}
