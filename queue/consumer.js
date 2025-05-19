const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected in consumer'))
.catch(err => console.error('MongoDB error in consumer:', err));
const amqp = require('amqplib');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const inAppService = require('../services/inAppService');
const { saveNotification } = require('../services/notificationStore');

const MAX_RETRIES = 3;

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

        saveNotification(notification.userId, notification);
        channel.ack(msg);
      } catch (err) {
        console.error('Error processing notification:', err.message);

        const retryCount = notification.retries || 0;
        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying... Attempt ${retryCount + 1}`);
          notification.retries = retryCount + 1;
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)), {
            persistent: true,
          });
        } else {
          console.error('Max retries exceeded. Dropping message.');
        }

        channel.ack(msg); // To avoid retry loop if not handled
      }
    }
  });
}

startConsumer();
