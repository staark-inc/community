import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadPayload {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  source?: string;
  status?: string;
  value?: string | number;
  notes?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateLead(
  body: unknown
): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body" };
  const b = body as Record<string, unknown>;

  if (!b.company || typeof b.company !== "string" || !b.company.trim())
    return { ok: false, error: "company is required" };
  if (!b.contact || typeof b.contact !== "string" || !b.contact.trim())
    return { ok: false, error: "contact is required" };
  if (
    !b.email ||
    typeof b.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)
  )
    return { ok: false, error: "A valid email is required" };

  return {
    ok: true,
    data: {
      company: (b.company as string).trim(),
      contact: (b.contact as string).trim(),
      email: (b.email as string).trim().toLowerCase(),
      phone: typeof b.phone === "string" ? b.phone.trim() || undefined : undefined,
      source: typeof b.source === "string" ? b.source.trim() || undefined : undefined,
      status: typeof b.status === "string" ? b.status : "new",
      value: b.value as string | number | undefined,
      notes: typeof b.notes === "string" ? b.notes.trim() || undefined : undefined,
    },
  };
}

// ─── Webhook dispatcher ───────────────────────────────────────────────────────

async function dispatchWebhook(event: string, payload: unknown) {
  const url = process.env.WEBHOOK_URL;
  const secret = process.env.WEBHOOK_SECRET;
  if (!url) return;

  try {
    const body = JSON.stringify({ event, payload, timestamp: new Date().toISOString() });
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    if (secret) {
      const enc = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw", enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false, ["sign"]
      );
      const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
      const hex = Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      headers["X-Staark-Signature"] = `sha256=${hex}`;
    }

    await fetch(url, { method: "POST", headers, body });
  } catch (err) {
    // Webhook failures must never break the main request
    console.error("[webhook] dispatch failed:", err);
  }
}

// ─── GET /api/leads ───────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1",  10));
  const limit  = Math.min(100, parseInt(searchParams.get("limit") ?? "50", 10));
  const offset = (page - 1) * limit;

  try {
    /*
     * ── DB-backed version (uncomment when DB_HOST is set) ────────────────────
     *
     * const { db } = await import("@/lib/db");
     * const conditions: string[] = [];
     * const params: unknown[] = [];
     *
     * if (status) { conditions.push("status = ?"); params.push(status); }
     * if (search)  {
     *   conditions.push("(company LIKE ? OR contact LIKE ? OR email LIKE ?)");
     *   params.push(`%${search}%`, `%${search}%`, `%${search}%`);
     * }
     *
     * const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
     * const [rows]     = await db.execute(
     *   `SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
     *   [...params, limit, offset]
     * );
     * const [[{ total }]] = await db.execute(
     *   `SELECT COUNT(*) AS total FROM leads ${where}`, params
     * ) as any;
     *
     * return NextResponse.json({ leads: rows, total, page, limit });
     */

    return NextResponse.json({
      leads: [],
      total: 0,
      page,
      limit,
      _note: "Set DB_HOST in .env.local to enable database-backed leads.",
    });
  } catch (err) {
    console.error("[GET /api/leads]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate
  const validation = validateLead(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 422 });
  }
  const data = validation.data;

  try {
    /*
     * ── DB-backed version ─────────────────────────────────────────────────────
     *
     * const { db } = await import("@/lib/db");
     * const [result] = await db.execute(
     *   `INSERT INTO leads (company, contact, email, phone, source, status, value, notes, created_at)
     *    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
     *   [data.company, data.contact, data.email, data.phone ?? null,
     *    data.source ?? null, data.status, data.value ?? null, data.notes ?? null]
     * ) as any;
     * const [[lead]] = await db.execute(
     *   "SELECT * FROM leads WHERE id = ?", [result.insertId]
     * ) as any;
     */

    // Mock lead (template mode — no DB)
    const lead = {
      id: `L-${Date.now()}`,
      ...data,
      score: 50,
      created_at: new Date().toISOString(),
    };

    // Fire webhook asynchronously (non-blocking)
    dispatchWebhook("lead.created", lead);

    /*
     * ── Queue welcome email via BullMQ (uncomment when Redis is configured) ──
     *
     * try {
     *   const { emailQueue } = await import("@/lib/queues");
     *   await emailQueue.add(
     *     "welcome-email",
     *     { to: lead.email, name: lead.contact, leadId: lead.id },
     *     { attempts: 3, backoff: { type: "exponential", delay: 5000 } }
     *   );
     * } catch (qErr) {
     *   console.error("[queue] failed to enqueue welcome email:", qErr);
     * }
     */

    return NextResponse.json({ lead }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/leads]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
