const Disposition = require('../models/dispositionModel');

exports.createDisposition = async (req, res) => {
  try {
    const disposition = new Disposition(req.body);
    await disposition.save();
    res.status(201).json({ message: 'Disposition created successfully!', disposition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDispositions = async (req, res) => {
  try {
    const dispositions = await Disposition.find();
    res.status(200).json(dispositions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDisposition = async (req, res) => {
  try {
    const disposition = await Disposition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Disposition updated successfully!', disposition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDisposition = async (req, res) => {
  try {
    await Disposition.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Disposition deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
