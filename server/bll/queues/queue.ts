import { Queue } from "bullmq";
import { Services } from '@prisma/client';

const config = useRuntimeConfig();

export const queueServiceJob = async (
  queueName: string,
  jobName: string,
  serviceId: number
) => {
  const aQueue = new Queue(queueName, {
    connection: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT as unknown as number
    },
  });
  await aQueue.add(jobName, serviceId);
};
