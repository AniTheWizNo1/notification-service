const amqp = require('amqplib');

const QUEUE = 'notifications';

async function publishToQueue(data) {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE);
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));
  setTimeout(() => conn.close(), 500);
}

module.exports = publishToQueue;
 
