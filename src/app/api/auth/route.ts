import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth
 * Body: { action: "login" | "register", email, password, [name, company] }
 *
 * In production, replace this with NextAuth.js or your preferred auth library.
 * See: https://next-auth.js.org/getting-started/example
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { action, email, password } = body;

  if (!action) return NextResponse.json({ error: "action is required" }, { status: 422 });
  if (!email || typeof email !== "string") return NextResponse.json({ error: "email is required" }, { status: 422 });
  if (!password || typeof password !== "string") return NextResponse.json({ error: "password is required" }, { status: 422 });

  if (action === "login") {
    /*
     * Production example with DB + bcrypt:
     *
     * const { db } = await import("@/lib/db");
     * const [[user]] = await db.execute(
     *   "SELECT * FROM users WHERE email = ?", [email.toLowerCase()]
     * ) as any;
     *
     * if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
     *
     * const bcrypt = await import("bcryptjs");
     * const valid = await bcrypt.compare(password, user.password_hash);
     * if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
     *
     * // Issue a session token / JWT
     * const token = signJwt({ sub: user.id, email: user.email });
     * return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } });
     */

    return NextResponse.json({
      _note: "Configure your auth provider. See /src/app/api/auth/route.ts.",
      token: "mock-jwt-token",
      user: { id: "U-001", email, name: "John Doe" },
    });
  }

  if (action === "register") {
    const { name, company } = body;
    if (!name || typeof name !== "string") return NextResponse.json({ error: "name is required" }, { status: 422 });
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 422 });

    /*
     * const bcrypt = await import("bcryptjs");
     * const hash = await bcrypt.hash(password, 12);
     * const { db } = await import("@/lib/db");
     *
     * try {
     *   const [result] = await db.execute(
     *     "INSERT INTO users (email, password_hash, name, company, created_at) VALUES (?, ?, ?, ?, NOW())",
     *     [email.toLowerCase(), hash, name, company ?? null]
     *   ) as any;
     *   const token = signJwt({ sub: result.insertId, email });
     *   return NextResponse.json({ token, user: { id: result.insertId, email, name } }, { status: 201 });
     * } catch (err: any) {
     *   if (err.code === "ER_DUP_ENTRY") {
     *     return NextResponse.json({ error: "Email already registered" }, { status: 409 });
     *   }
     *   throw err;
     * }
     */

    return NextResponse.json(
      {
        _note: "Configure your auth provider. See /src/app/api/auth/route.ts.",
        token: "mock-jwt-token",
        user: { id: `U-${Date.now()}`, email, name, company },
      },
      { status: 201 }
    );
  }

  return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 422 });
}
