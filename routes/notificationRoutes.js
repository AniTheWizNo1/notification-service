/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Send a notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       202:
 *         description: Notification queued
 */

/**
 * @swagger
 * /users/{id}/notifications:
 *   get:
 *     summary: Get notifications for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of notifications
 */
const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getUserNotifications
} = require('../controllers/notificationController');

router.post('/notifications', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);

module.exports = router;

 
