const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/user/dashboard
// @desc    Get user dashboard (example protected route)
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: `Welcome to your dashboard, ${req.user.name}!`,
      data: {
        userId: req.user.id,
        email: req.user.email,
        memberSince: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
