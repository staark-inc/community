import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const posts = [
  {
    slug: "ai-lead-scoring-2025",
    tag: "Product",
    title: "How AI Lead Scoring Changed Our Customers' Close Rates",
    excerpt: "We analyzed 10,000 deals closed through Staark over the past year. Here's what the data says about AI scoring.",
    author: "Sarah Chen",
    authorInitials: "SC",
    date: "Jun 18, 2025",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "pipeline-velocity",
    tag: "Sales",
    title: "Pipeline Velocity: The Metric Every Sales Leader Should Track",
    excerpt: "Conversion rate alone doesn't tell the full story. Pipeline velocity ties together speed, volume, and deal size.",
    author: "Marcus Webb",
    authorInitials: "MW",
    date: "Jun 10, 2025",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "automation-playbook",
    tag: "Automation",
    title: "The 5 Automations Every Sales Team Should Have Running",
    excerpt: "Stop doing repetitive tasks manually. These five workflows save our customers an average of 12 hours per week.",
    author: "Priya Nair",
    authorInitials: "PN",
    date: "Jun 3, 2025",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "crm-vs-staark",
    tag: "Comparison",
    title: "Traditional CRM vs. Staark: What's the Difference?",
    excerpt: "CRMs track history. Staark helps you act on it. Here's how we're different from legacy tools.",
    author: "Sarah Chen",
    authorInitials: "SC",
    date: "May 27, 2025",
    readTime: "7 min",
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  Product: "badge-volt",
  Sales: "badge-success",
  Automation: "badge-warning",
  Comparison: "badge-neutral",
};

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

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
                className={`px-4 py-2 text-sm rounded-lg hover:bg-ink-700/50 transition-all duration-200 font-medium ${item === "Blog" ? "text-volt" : "text-ink-300 hover:text-ink-100"}`}>
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

      <section className="pt-32 pb-10 px-6 text-center">
        <h1 className="font-display font-800 text-5xl text-ink-50 tracking-tight mb-4">Blog</h1>
        <p className="text-ink-300 text-lg">Insights on sales, lead intelligence, and growth.</p>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Featured */}
          <div className="card p-8 grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-ink-800/60 rounded-xl h-48 border border-ink-600/40 flex items-center justify-center">
              <span className="text-5xl">📈</span>
            </div>
            <div>
              <span className={`${tagColors[featured.tag]} mb-3 inline-flex`}>{featured.tag}</span>
              <h2 className="font-display font-700 text-2xl text-ink-50 mb-3 leading-tight">
                {featured.title}
              </h2>
              <p className="text-sm text-ink-300 mb-5 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-volt/15 border border-volt/20 flex items-center justify-center text-xs font-display font-600 text-volt">
                    {featured.authorInitials}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-ink-200">{featured.author}</div>
                    <div className="text-[10px] text-ink-500">{featured.date} · {featured.readTime} read</div>
                  </div>
                </div>
                <a href="#" className="btn-secondary text-xs">
                  Read more <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Rest */}
          <div className="grid md:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <a key={i} href="#" className="card-hover p-5 group cursor-pointer block">
                <span className={`${tagColors[post.tag]} mb-3 inline-flex`}>{post.tag}</span>
                <h3 className="font-display font-600 text-ink-100 mb-2 text-sm leading-snug group-hover:text-volt transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-ink-400 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-volt/15 border border-volt/20 flex items-center justify-center text-[9px] font-display font-600 text-volt">
                    {post.authorInitials}
                  </div>
                  <span className="text-[10px] text-ink-500">{post.date} · {post.readTime}</span>
                </div>
              </a>
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
