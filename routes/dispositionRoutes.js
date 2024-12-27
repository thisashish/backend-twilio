const express = require('express');
const { createDisposition, getDispositions, updateDisposition, deleteDisposition } = require('../controllers/dispositionController');

const router = express.Router();

router.post('/', createDisposition);
router.get('/:campaignId', getDispositions);

router.put('/:id', updateDisposition);

router.delete('/:id', deleteDisposition);


module.exports = router;
