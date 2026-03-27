import { NextRequest, NextResponse } from "next/server";

// ─── Signature verification ───────────────────────────────────────────────────

async function verifySignature(
  body: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) return false;

  // Expected format: "sha256=<hex>"
  const parts = signature.split("=");
  if (parts.length !== 2 || parts[0] !== "sha256") return false;
  const receivedHex = parts[1];

  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false, ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));
    const expectedHex = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Timing-safe comparison
    if (expectedHex.length !== receivedHex.length) return false;
    let diff = 0;
    for (let i = 0; i < expectedHex.length; i++) {
      diff |= expectedHex.charCodeAt(i) ^ receivedHex.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

// ─── Event handlers ───────────────────────────────────────────────────────────

async function handleLeadCreated(payload: Record<string, unknown>) {
  console.log("[webhook] lead.created:", payload.id);
  /*
   * Example: enqueue a welcome email
   *
   * const { emailQueue } = await import("@/lib/queues");
   * await emailQueue.add("welcome-email", {
   *   to: payload.email,
   *   name: payload.contact,
   *   leadId: payload.id,
   * }, { attempts: 3, backoff: { type: "exponential", delay: 5000 } });
   */
}

async function handleLeadUpdated(payload: Record<string, unknown>) {
  console.log("[webhook] lead.updated:", payload.id, "→ status:", payload.status);
  /*
   * Example: trigger a Slack notification when a lead is marked qualified
   *
   * if (payload.status === "qualified") {
   *   await fetch(process.env.SLACK_WEBHOOK_URL!, {
   *     method: "POST",
   *     headers: { "Content-Type": "application/json" },
   *     body: JSON.stringify({ text: `🎯 Lead qualified: ${payload.company}` }),
   *   });
   * }
   */
}

async function handleLeadDeleted(payload: Record<string, unknown>) {
  console.log("[webhook] lead.deleted:", payload.id);
}

// ─── POST /api/webhooks ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("X-Staark-Signature");
  const secret = process.env.WEBHOOK_SECRET;

  // Verify signature when a secret is configured
  if (secret) {
    const valid = await verifySignature(rawBody, signature, secret);
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event: { event: string; payload: Record<string, unknown>; timestamp?: string };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!event.event || !event.payload) {
    return NextResponse.json({ error: "Missing event or payload" }, { status: 422 });
  }

  // Route events
  try {
    switch (event.event) {
      case "lead.created":
        await handleLeadCreated(event.payload);
        break;
      case "lead.updated":
        await handleLeadUpdated(event.payload);
        break;
      case "lead.deleted":
        await handleLeadDeleted(event.payload);
        break;
      default:
        console.warn("[webhook] unknown event:", event.event);
    }

    return NextResponse.json({ received: true, event: event.event });
  } catch (err) {
    console.error("[POST /api/webhooks]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── GET /api/webhooks — health check ────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "webhooks",
    events: ["lead.created", "lead.updated", "lead.deleted"],
    timestamp: new Date().toISOString(),
  });
}
