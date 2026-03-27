import { NextRequest, NextResponse } from "next/server";

// ─── GET /api/leads/[id] ──────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });

  try {
    /*
     * const { db } = await import("@/lib/db");
     * const [[lead]] = await db.execute("SELECT * FROM leads WHERE id = ?", [id]) as any;
     * if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
     * return NextResponse.json({ lead });
     */

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    console.error(`[GET /api/leads/${id}]`, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── PATCH /api/leads/[id] ────────────────────────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Whitelist updatable fields
  const allowed = ["company", "contact", "email", "phone", "source", "status", "value", "notes", "score"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 422 });
  }

  try {
    /*
     * const { db } = await import("@/lib/db");
     * const setClauses = Object.keys(updates).map((k) => `${k} = ?`).join(", ");
     * const values = [...Object.values(updates), id];
     * await db.execute(`UPDATE leads SET ${setClauses}, updated_at = NOW() WHERE id = ?`, values);
     * const [[lead]] = await db.execute("SELECT * FROM leads WHERE id = ?", [id]) as any;
     * if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
     *
     * // Dispatch webhook
     * // dispatchWebhook("lead.updated", lead);
     *
     * return NextResponse.json({ lead });
     */

    return NextResponse.json({ id, ...updates, updated_at: new Date().toISOString() });
  } catch (err) {
    console.error(`[PATCH /api/leads/${id}]`, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/leads/[id] ───────────────────────────────────────────────────

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing lead ID" }, { status: 400 });

  try {
    /*
     * const { db } = await import("@/lib/db");
     * const [result] = await db.execute("DELETE FROM leads WHERE id = ?", [id]) as any;
     * if (result.affectedRows === 0) {
     *   return NextResponse.json({ error: "Lead not found" }, { status: 404 });
     * }
     * // dispatchWebhook("lead.deleted", { id });
     */

    return NextResponse.json({ deleted: true, id });
  } catch (err) {
    console.error(`[DELETE /api/leads/${id}]`, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
