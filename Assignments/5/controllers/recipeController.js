/**
 * Recipe Controller
 * Handles the logic for user recipes
 */
const { validationResult } = require('express-validator');
const Recipe = require('../models/Recipe');

/**
 * Display recipe page
 */
exports.getRecipe = (req, res) => {
  // Add hasProfileImage flag to user object
//   const user = { ...req.session.user };
//   user.hasProfileImage = user.hasProfileImage || false;
const recipe = Recipe.findById(req.id);
  res.render('recipes/show', {
    title: 'Recipe',
    recipe: recipe
  });
};

/**
 * Process registration form submission
 */
exports.postRegister = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/register', {
        title: 'Register',
        errors: errors.array(),
        formData: {
          username: req.body.username,
          email: req.body.email
        }
      });
    }

    // Create new user
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Redirect to login page with success message
    req.session.flashMessage = {
      type: 'success',
      text: 'Registration successful! You can now log in.'
    };
    res.redirect('/auth/login');
  } catch (error) {
    next(error);
  }
};

/**
 * Display login form
 */
exports.getLogin = (req, res) => {
  // Get flash message from session if it exists
  const flashMessage = req.session.flashMessage;
  // Clear flash message from session
  delete req.session.flashMessage;

  res.render('auth/login', {
    title: 'Login',
    errors: [],
    flashMessage
  });
};

/**
 * Process login form submission
 */
exports.postLogin = async (req, res, next) => {
  try {
    console.log('Login attempted for email:', req.body.email);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).render('auth/login', {
        title: 'Login',
        errors: errors.array(),
        formData: {
          email: req.body.email
        }
      });
    }

    // Find user by email
    const user = await User.findByEmail(req.body.email);
    console.log('User found in database:', !!user);

    // Check if user exists
    if (!user) {
      console.log('User not found in database');
      return res.status(401).render('auth/login', {
        title: 'Login',
        errors: [{ msg: 'Invalid email or password' }],
        formData: {
          email: req.body.email
        }
      });
    }

    // Check password
    const isPasswordValid = await User.comparePassword(req.body.password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).render('auth/login', {
        title: 'Login',
        errors: [{ msg: 'Invalid email or password' }],
        formData: {
          email: req.body.email
        }
      });
    }

    // Set user session (don't include password in the session)
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      hasProfileImage: user.has_profile_image,
      createdAt: user.created_at
    };

    // Save session explicitly to ensure it's stored
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return next(err);
      }

      console.log('Session saved successfully. User is now authenticated.');
      console.log('Session data:', req.session);

      // Redirect to originally requested URL or profile page
      const redirectUrl = req.session.returnTo || '/user/profile';
      delete req.session.returnTo;

      console.log('Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

/**
 * Process user logout
 */
exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect to home page
    res.redirect('/');
  });
};
