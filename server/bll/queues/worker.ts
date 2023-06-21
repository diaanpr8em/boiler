import { Queue, QueueOptions } from "bullmq";

const config = useRuntimeConfig();

export const queueJob = async (
  queueName: string,
  jobName: string,
  serviceId: number
) => {
  const aQueue = new Queue(queueName, {
    connection: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    },
  });
  await aQueue.add(jobName, serviceId);
};
