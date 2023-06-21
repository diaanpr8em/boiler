import { Queue, QueueOptions } from "bullmq";
import { Services } from '@prisma/client';

const config = useRuntimeConfig();

export const queueServiceJob = async (
  queueName: string,
  jobName: string,
  serviceRecord: Services
) => {
  const aQueue = new Queue(queueName, {
    connection: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT as unknown as number
    },
  });
  await aQueue.add(jobName, JSON.stringify(serviceRecord));
};
