// backend/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Import the authRoutes
const path = require('path');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
  },
});

const upload = multer({ storage: storage });

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (e.g., profile pictures)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes from authRoutes.js
app.use('/api', authRoutes); // All authentication routes are prefixed with /api

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
