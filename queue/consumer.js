const amqp = require('amqplib');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const inAppService = require('../services/inAppService');

async function startConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: true });

  console.log('Consumer ready. Waiting for notifications...');

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      console.log('Received:', notification);

      try {
        switch (notification.type) {
          case 'email':
            await emailService.send(notification.contact, notification.message);
            break;
          case 'sms':
            await smsService.send(notification.contact, notification.message);
            break;
          case 'in-app':
            await inAppService.send(notification.userId, notification.message);
            break;
          default:
            console.warn('Unsupported notification type:', notification.type);
        }

        channel.ack(msg);
      } catch (err) {
        console.error('Error sending notification:', err);
        // Optional: requeue or log failure
      }
    }
  });
}

startConsumer();
