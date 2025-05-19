const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Notification = require('./models/Notification');

dotenv.config();
const app = express();

app.use(bodyParser.json());

// Serve frontend (index.html)
app.use(express.static(path.join(__dirname)));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
      description: 'API to send and fetch notifications'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/', notificationRoutes);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

// GET: Fetch notifications for a user from MongoDB
app.get('/users/:id/notifications', async (req, res) => {
  const userId = req.params.id;
  try {
    const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
    res.json({ success: true, notifications});
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
