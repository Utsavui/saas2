const User = require('../models/User');

// @desc    Get all registered users (excluding passwords)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user account
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found'
      });
    }

    // Prevent administrators from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own admin account'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
