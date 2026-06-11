const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/authMiddleware');

// Apply protection to all routes in this file
router.use(protect);
router.use(admin);

// @route   GET api/admin/users
// @desc    Get all users (excluding passwords)
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving users' });
  }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent deleting oneself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting user' });
  }
});

// @route   GET api/admin/contacts
// @desc    Get all contact submissions
// @access  Private/Admin
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving contact submissions' });
  }
});

// @route   PUT api/admin/contacts/:id/read
// @desc    Mark a contact submission as read/unread
// @access  Private/Admin
router.put('/contacts/:id/read', async (req, res) => {
  const { isRead } = req.body;
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact record not found' });
    }

    contact.isRead = isRead !== undefined ? isRead : true;
    await contact.save();

    res.json({ success: true, message: 'Contact status updated successfully', data: contact });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
});

// @route   DELETE api/admin/contacts/:id
// @desc    Delete a contact submission
// @access  Private/Admin
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact record not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting contact record' });
  }
});

module.exports = router;
