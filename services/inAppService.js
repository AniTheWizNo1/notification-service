const Notification = require('../models/Notification');

module.exports = {
  send: async (userId, message) => {
    await Notification.create({
      userId,
      type: 'in-app',
      message
    });

    console.log(`In-app notification saved for ${userId}`);
  }
};
