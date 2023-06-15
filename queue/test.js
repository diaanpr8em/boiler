const { Queue, Worker, Job } = require("bullmq");

// graceful shutdown if server is shutdown
process.on("SIGINT", async () => {
  await worker.close();
});

process.on("uncaughtException", function (err) {
  // Handle the error safely
  logger.error(err, "Uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  // Handle the error safely
  logger.error({ promise, reason }, "Unhandled Rejection at: Promise");
});

// Create a new connection in every instance
const myQueue = new Queue("dummy", {
  connection: {
    host: env("REDIS_HOST"),
    port: env("REDIS_PORT"),
  },
});
const addQueues = async () => {
  await myQueue.add("paint", { color: "red" });
}
addQueues()

const myWorker = new Worker(
  "dummy",
  async (job: Job) => {
    // do stuff here
    const id = 1;
  },
  {
    connection: {
      host: env("REDIS_HOST"),
      port: env("REDIS_PORT"),
    },
  }
);

myWorker.run();
myWorker.on("completed", (job: Job, returnvalue: any) => {
  console.log(returnvalue);
});
