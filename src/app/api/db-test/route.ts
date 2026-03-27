import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1 as test");

    return Response.json({
      ok: true,
      db: rows,
    });
  } catch (error) {
    return Response.json({
      ok: false,
      error: String(error),
    });
  }
}