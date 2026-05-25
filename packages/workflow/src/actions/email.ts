import { ActionHandler } from '../engine';

export const emailHandler: ActionHandler = async (config, context) => {
  // In a real implementation, this would use an email service
  console.log(`[EmailAction] Sending email to: ${config.to}`);
  return { sent: true, recipient: config.to, timestamp: new Date().toISOString() };
};
