const Recording = require('../models/recordingModel');  // Import the Recording model

exports.handleRecording = async (req, res) => {
  try {
    const { recordingUrl, callSid } = req.body;

    // Create a new recording document
    const newRecording = new Recording({
      callSid,
      recordingUrl,
    });

    // Save the recording to the database
    await newRecording.save();

    res.status(200).json({
      message: 'Recording saved successfully!',
      data: newRecording,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







// const s3Service = require('../services/s3Service');

// exports.handleRecording = async (req, res) => {
//   try {
//     const { recordingUrl, callSid } = req.body;
//     const fileName = `${callSid}.mp3`;

//     const uploadResult = await s3Service.uploadFromUrl(recordingUrl, fileName);
//     res.status(200).json({ message: 'Recording uploaded successfully!', data: uploadResult });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
