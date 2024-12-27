require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const cors = require('cors');
const twilio = require('twilio');

// Routes
const csvRoutes = require('./routes/csvRoutes');
const dispositionRoutes = require('./routes/dispositionRoutes');
const recordingRoutes = require('./routes/recordingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://assets.flex.twilio.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(timeout('10s'));
app.use((req, res, next) => {
  if (!req.timedout) return next();
  res.status(503).send('Request Timeout');
});

// Twilio Client Setup
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = twilio(accountSid, authToken, {
//   httpClient: new MyRequestClient(60000, {
//     protocol: 'https',
//     host: '127.0.0.1',
//     port: 9000,
//   }),
// });

// Example Twilio Usage (for testing purposes)
app.get('/api/test-twilio', async (req, res) => {
  try {
    const message = await client.messages.create({
      body: 'Hello from Twilio!',
      from: '+1234567890', // Replace with a Twilio number
      to: '+0987654321',   // Replace with a verified number
    });
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Database connection error:', err));

// Routes
app.use('/api/csv', csvRoutes);
app.use('/api/dispositions', dispositionRoutes);
app.use('/api/recordings', recordingRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
