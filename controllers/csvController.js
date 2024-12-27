const fs = require('fs');
const path = require('path');
const csvService = require('../services/csvService');

exports.uploadCSV = async (req, res) => {
  try {
    // Access file details after upload
    const { originalname, path: filePath } = req.file;

    // Check if file path exists
    if (!filePath) {
      return res.status(400).json({ error: 'File not uploaded correctly!' });
    }

    console.log('File uploaded:', req.file); // Log file details for debugging

    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir); // Ensure the uploads directory exists
    }

    console.log(uploadsDir, "uploadsDir");

    const newFilePath = path.join(uploadsDir, originalname);
    fs.renameSync(filePath, newFilePath); // Move the file to the correct directory

    console.log(newFilePath, "newFilePath");

    res.status(200).json({
      message: 'CSV uploaded successfully!',
      filePath: newFilePath, // Return the new file path
    });
  } catch (error) {
    console.log('Upload error:', error.message);
    res.status(500).json({ error: error.message });
  }
};



exports.processCSV = async (req, res) => {
  try {
    const { filePath } = req.body;

    console.log(req.body,"xxxxxxxxxxxxxxxxxxxx");
    console.log(filePath,"mmmmmmmmmmmmmmmmmmmmmmm");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found!' });
    }

    // Process the file using csvService
    const processedData = await csvService.processFile(filePath);

    console.log(processedData,"yyyyyyyyyyyyyyyyyyyyyy");

    res.status(200).json({ 
      message: 'CSV processed successfully!', 
      data: processedData 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// const csvService = require('../services/csvService');
// const s3Service = require('../services/s3Service');

// exports.uploadCSV = async (req, res) => {
//   try {
//     const file = req.files.csvFile; // Assumes use of `express-fileupload`
//     const uploadResult = await s3Service.uploadFile(file);
//     res.status(200).json({ message: 'CSV uploaded successfully!', data: uploadResult });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.processCSV = async (req, res) => {
//   try {
//     const processedData = await csvService.processFile(req.body.filePath);
//     res.status(200).json({ message: 'CSV processed successfully!', data: processedData });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




