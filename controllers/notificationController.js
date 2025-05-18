const Notification = require('../models/Notification');
const sendEmail = require('../services/emailService');
const sendSMS = require('../services/smsService');
const inApp = require('../services/inAppService');

exports.sendNotification = async (req, res) => {
  const { userId, type, message, contact } = req.body;

  try {
    if (type === 'email') await sendEmail(contact, message);
    else if (type === 'sms') await sendSMS(contact, message);
    else await inApp(userId, message, Notification);

    const notif = await Notification.create({ userId, type, message });
    res.status(200).json({ success: true, data: notif });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  const userId = req.params.id;
  const notifs = await Notification.find({ userId });
  res.status(200).json(notifs);
};
 
const publishToQueue = require('../queue/publisher');

exports.sendNotification = async (req, res) => {
  const { userId, type, message, contact } = req.body;

  try {
    // Push the message into the queue
    await publishToQueue({ userId, type, message, contact });

    res.status(202).json({ success: true, message: 'Notification queued' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
