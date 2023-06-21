import { insert } from "~/server/db/services/sms";
import { queueServiceJob } from "~/server/bll/queues/worker";
import { JobNames, QueueNames } from "~/server/models/enums/queues";
import { hasSufficientBalanceAvailable } from "~/server/bll/billing/billing";
import { SMSAdvancedMessage } from "~/server/models/services/generic/sms";

export const processSMS = async (body: SMSAdvancedMessage) => {
  // who is this? Diaan to show usage of auth here
  const user = 0;
  // check credits
  //const hasBalance = hasSufficientBalanceAvailable(user, )
  // send if credits
  const sms = await insert(body);
  const job = queueServiceJob(QueueNames.OUTBOUND, JobNames.SMS_SEND, sms);

  return { sms };
};
