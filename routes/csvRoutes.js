const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadCSV, processCSV } = require('../controllers/csvController');

const router = express.Router();

// Configure Multer to store the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir); // Ensure the uploads directory exists
    }
    cb(null, uploadsDir); // Set the destination for the uploaded file
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name for saving
  },
});

const upload = multer({ storage });

// Route to upload CSV file
router.post('/upload-csv', upload.single('csvFile'), uploadCSV);
router.post('/process-csv', processCSV);

module.exports = router;








// const express = require('express');
// const multer = require('multer');
// const { uploadCSV, processCSV } = require('../controllers/csvController');

// const router = express.Router();

// // Configure Multer to handle file uploads without saving to local disk
// const storage = multer.memoryStorage(); // Store files in memory (no local save)

// const upload = multer({ storage });

// // Route to upload CSV to S3
// router.post('/upload-csv', upload.single('csvFile'), uploadCSV);

// // Route to process the CSV file (if necessary after uploading)
// router.post('/process-csv', processCSV);

// module.exports = router;
