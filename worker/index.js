const { Worker } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

console.log("[worker] Starting...");

// Coadă emailuri
const emailWorker = new Worker(
  process.env.EMAIL_QUEUE_NAME || "staark:emails",
  async (job) => {
    console.log(`[worker] Processing email job: ${job.id}`, job.data);
    // TODO: implementează trimitere email via SMTP
    // const { to, subject, body } = job.data;
    // await sendEmail({ to, subject, body });
  },
  { connection }
);

// Coadă automatizări
const autoWorker = new Worker(
  process.env.AUTOMATION_QUEUE_NAME || "staark:automations",
  async (job) => {
    console.log(`[worker] Processing automation job: ${job.id}`, job.data);
    // TODO: implementează logica de automatizare
  },
  { connection }
);

emailWorker.on("completed", (job) => console.log(`[worker] Email job ${job.id} completed`));
emailWorker.on("failed", (job, err) => console.error(`[worker] Email job ${job?.id} failed:`, err.message));
autoWorker.on("completed", (job) => console.log(`[worker] Auto job ${job.id} completed`));
autoWorker.on("failed", (job, err) => console.error(`[worker] Auto job ${job?.id} failed:`, err.message));

console.log("[worker] Ready — listening for jobs...");

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("[worker] Shutting down...");
  await emailWorker.close();
  await autoWorker.close();
  await connection.quit();
  process.exit(0);
});
