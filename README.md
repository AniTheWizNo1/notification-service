# Notification Service

A simple Node.js-based notification system built for the Formi Internship Assignment. Supports Email, SMS, and In-App notifications using a queue-based architecture (RabbitMQ).

---

## Features

- REST API to queue notifications
- RabbitMQ-based processing queue
- Supports Email, SMS, and In-App notification types
- Retry mechanism for failed notifications (up to 3 times)
- In-memory store for fetching user-specific notification history
- Modular and extensible codebase

---

## Tech Stack

- Node.js + Express
- RabbitMQ
- Nodemailer (Email)
- In-memory data store (for demo)
- Optional: SMS and In-App modules are mocked

---

## API Endpoints

### `POST /notifications`

Queue a notification for processing.

**Request Body:**
```json
{
  "userId": "123",
  "type": "email",
  "message": "Hello from Notification Service!",
  "contact": "example@email.com"
}
