/**
 * User routes
 * Handles protected routes that require authentication
 */
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');

// Controller imports
const userController = require('../controllers/userController');

// All routes in this file require authentication
router.use(isAuthenticated);

// GET /user/profile - User profile page
router.get('/profile', userController.getProfile);

// GET /user/settings - User settings page
router.get('/settings', userController.getSettings);

// POST /user/settings - Update user settings
router.post('/settings', userController.updateSettings);

// GET /user/profile-image - Get current user's profile image
router.get('/profile-image', userController.getProfileImage);

// GET /user/profile-image/:userId - Get any user's profile image by ID
router.get('/profile-image/:userId', userController.getUserProfileImage);

router.get('/profile', (req, res) => {
  const userRecipes = [
    {
      id: 1,
      title: "Chicken Biryani",
      description: "Aromatic basmati rice with spiced chicken.",
      image: "/images/biryani.jpg",
      likes: 22
    },
    {
      id: 2,
      title: "Chocolate Chip Cookies",
      description: "Soft, chewy, and loaded with chocolate.",
      image: "/images/cookies.jpg",
      likes: 45
    }
  ];

  res.render('user/profile', {
    title: "My Profile",
    user: req.session.user,
    userRecipes
  });
});



module.exports = router;

