const express = require('express');
const { handleRecording } = require('../controllers/callRecordingController');

const router = express.Router();

router.post('/callback', handleRecording);

module.exports = router;
