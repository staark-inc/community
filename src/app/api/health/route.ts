import { NextResponse } from "next/server";

export async function GET() {
  const checks: Record<string, { status: "ok" | "error" | "unconfigured"; latency?: number }> = {};

  // ── Database ────────────────────────────────────────────────────────────────
  if (process.env.MYSQL_HOST) {
    const t = Date.now();
    
    try {
      const { db } = await import("@/lib/db");
      await db.execute("SELECT 1");
      checks.database = { status: "ok", latency: Date.now() - t };
    } catch {
      checks.database = { status: "error" };
    }
  } else {
    checks.database = { status: "unconfigured" };
  }

  // ── Redis ───────────────────────────────────────────────────────────────────
  if (process.env.REDIS_HOST) {
    const t = Date.now();
    try {
      const { redis } = await import("@/lib/redis");
      await redis.ping();
      checks.redis = { status: "ok", latency: Date.now() - t };
    } catch {
      checks.redis = { status: "error" };
    }
  } else {
    checks.redis = { status: "unconfigured" };
  }

  const allOk = Object.values(checks).every((c) => c.status !== "error");

  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      version: process.env.npm_package_version ?? "0.1.0",
      environment: process.env.NODE_ENV,
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: allOk ? 200 : 503 }
  );
}
