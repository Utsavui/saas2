const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact submissions
// @route   GET /api/admin/contacts
// @access  Private/Admin
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a contact submission as read/unread
// @route   PUT /api/admin/contacts/:id/read
// @access  Private/Admin
const updateContactStatus = async (req, res, next) => {
  const { isRead } = req.body;

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission record not found'
      });
    }

    contact.isRead = isRead !== undefined ? isRead : true;
    await contact.save();

    res.json({
      success: true,
      message: 'Contact submission status updated successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact submission
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission record not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
};
