import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1",  10));
  const limit  = Math.min(100, parseInt(searchParams.get("limit") ?? "50", 10));
  const offset = (page - 1) * limit;

  try {
    /*
     * const { db } = await import("@/lib/db");
     * const conditions: string[] = [];
     * const params: unknown[] = [];
     *
     * if (status) { conditions.push("status = ?"); params.push(status); }
     * if (search)  {
     *   conditions.push("(name LIKE ? OR industry LIKE ?)");
     *   params.push(`%${search}%`, `%${search}%`);
     * }
     *
     * const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
     * const [rows]     = await db.execute(
     *   `SELECT * FROM clients ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
     *   [...params, limit, offset]
     * );
     * const [[{ total }]] = await db.execute(
     *   `SELECT COUNT(*) AS total FROM clients ${where}`, params
     * ) as any;
     *
     * return NextResponse.json({ clients: rows, total, page, limit });
     */

    return NextResponse.json({
      clients: [],
      total: 0,
      page,
      limit,
      _note: "Set DB_HOST in .env.local to enable database-backed clients.",
    });
  } catch (err) {
    console.error("[GET /api/clients]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  if (!b.name || typeof b.name !== "string") {
    return NextResponse.json({ error: "name is required" }, { status: 422 });
  }

  try {
    /*
     * const { db } = await import("@/lib/db");
     * const [result] = await db.execute(
     *   `INSERT INTO clients (name, industry, tier, arr, status, created_at)
     *    VALUES (?, ?, ?, ?, ?, NOW())`,
     *   [b.name, b.industry ?? null, b.tier ?? "starter", b.arr ?? null, b.status ?? "active"]
     * ) as any;
     * const [[client]] = await db.execute(
     *   "SELECT * FROM clients WHERE id = ?", [result.insertId]
     * ) as any;
     * return NextResponse.json({ client }, { status: 201 });
     */

    const client = {
      id: `C-${Date.now()}`,
      name: (b.name as string).trim(),
      industry: b.industry ?? null,
      tier: b.tier ?? "starter",
      arr: b.arr ?? null,
      status: b.status ?? "active",
      health: 80,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ client }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/clients]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
