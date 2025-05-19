Notification Service

Hi, I'm Aniket Das (KIIT Roll No: 22053226) and this is my full-stack Notification Service built for the Formi Internship assignment. This service handles notifications across three channels — Email, SMS, and In-App — using Node.js, Express, MongoDB Atlas, and RabbitMQ.

Features:

Send Notifications via:
• Email (using Nodemailer)
• SMS (using Twilio)
• In-App (stored in MongoDB)

Queue-based message handling using RabbitMQ with retry logic

API Documentation via Swagger UI

Fetch user notifications (in-app) by user ID

Clean and responsive frontend (HTML + Vanilla JS)

Tech Stack:

Backend: Node.js + Express

Database: MongoDB Atlas (Mongoose)

Queue: RabbitMQ (AMQP)

Email: Nodemailer

SMS: Twilio

Frontend: HTML, CSS, JavaScript

Docs: Swagger (OpenAPI)

Folder Structure:

notification-service/

app.js : Main Express app

.env : Environment variables

queue/

publisher.js : Pushes notifications to queue

consumer.js : Processes queued messages

services/

emailService.js : Sends email notifications

smsService.js : Sends SMS using Twilio

inAppService.js : Stores in-app messages to MongoDB

models/

Notification.js : Mongoose schema

routes/

notificationRoutes.js : API endpoints

index.html : Frontend UI

README.txt : Project documentation

Environment Setup:

Create a .env file with the following keys:
PORT=3000
MONGO_URI=<your MongoDB Atlas connection URI>
TWILIO_SID=<your Twilio SID>
TWILIO_AUTH_TOKEN=<your Twilio Auth Token>
TWILIO_PHONE=<your Twilio verified phone number>
EMAIL_USER=<your email address>
EMAIL_PASS=<your email password or app password>

How to Run:

Install dependencies:
npm install

Start the queue consumer:
nodemon queue/consumer.js

Start the Express server:
nodemon app.js

Open in browser:
http://localhost:3000/index.html

View API docs (Swagger):
http://localhost:3000/docs

Use Case Flow:

Enter User ID, Notification Type, Message, and Contact (for email or SMS)

Click "Send Notification" to queue it

Consumer processes it and stores or sends based on type

Click "View Notifications" to check in-app messages

Highlights:

Implemented retry mechanism for failed deliveries

Clean modular code with separate services for each channel

Real-time MongoDB Atlas integration

Fully working HTML UI with no external libraries

Validated and debugged all edge cases during integration

Acknowledgements:

Thanks to Formi for the opportunity

Technologies used: MongoDB, Twilio, Nodemailer, RabbitMQ, Swagger

Special thanks to OpenAI for technical guidance

Aniket Das
Email: aniket10das@gmail.com
Contact: +918910137572
LinkedIn: https://www.linkedin.com/in/aniket10das
