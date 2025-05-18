// This is a mock in-memory store. Use DB in real app.
const store = {};

function saveNotification(userId, notification) {
  if (!store[userId]) {
    store[userId] = [];
  }
  store[userId].push({ ...notification, timestamp: new Date().toISOString() });
}

function getUserNotifications(userId) {
  return store[userId] || [];
}

module.exports = { saveNotification, getUserNotifications };
