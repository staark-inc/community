import { emailQueue } from "@/lib/queues";

export async function POST() {
  try {
    const job = await emailQueue.add("send-welcome-email", {
      email: "test@staarkinc.com",
      name: "Test User",
    });

    return Response.json({
      ok: true,
      jobId: job.id,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}