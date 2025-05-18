module.exports = async (userId, message, Notification) => {
  await Notification.create({
    userId,
    type: 'in-app',
    message,
  });
};
 
