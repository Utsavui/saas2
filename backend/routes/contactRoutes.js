const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
      data: newContact,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Server error during submission', error: error.message });
  }
});

module.exports = router;
