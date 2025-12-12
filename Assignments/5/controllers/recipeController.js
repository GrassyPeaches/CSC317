/**
 * Recipe Controller
 * Handles the logic for user recipes
 */
const { validationResult } = require("express-validator");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Step = require("../models/Step");
/**
 * Display recipe page
 */
exports.getRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe == null) {
    return res.status(404).render("/error");
  }

  console.log(recipe);

  recipe.ingredients = await Ingredient.findByRecipeId(recipe.id);
  //console.log("Ingredients", ingredients);
  console.log(recipe);
  recipe.steps = await Step.findByRecipeId(recipe.id);
  //recipe.recipe_images = await RecipeImage.findByRecipeId(recipe.id);

  res.render("recipes/show", {
    title: "Recipe",
    recipe: recipe,
  });
};

/**
 * Display all user recipes
 */
exports.getUserRecipes = async (req, res) => {
  const user = { ...req.session.user };
  user.hasProfileImage = user.hasProfileImage || false;

  const userRecipes = await Recipe.findByUserId(user.id);
  if (userRecipes == null) {
    return res.status(404).render("/error");
  }

  console.log("My RECIPES", userRecipes);
  res.render("user/profile", {
    title: "My Recipes",
    user: user,
    userRecipes: userRecipes,
  });
};

/**
 * Display all recipes
 */
exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.findAll();
  if (recipes == null) {
    return res.status(404).render("/error");
  }

  console.log(recipes);
  res.render("recipes/index", {
    title: "All Recipes",
    recipes: recipes,
  });
};

/**
 * Create a new recipe
 */
exports.postNewRecipe = async (req, res, next) => {
  try {
    console.log("NEW RECIPE");
    const recipe = {};
    console.log("BODY!")
    console.log(req.body);

    recipe.title = req.body.title;
    recipe.description = req.body.description;

    // ingredients and steps should be an array

    recipe.ingredients = req.body.ingredients;
    recipe.steps = req.body.steps;
    console.log("RECIPE")
    console.log(recipe);

    if (typeof recipe.title !== 'string' || typeof recipe.description !== 'string') {
      return res.status(400).render('recipes/new', {
        title: 'Create Recipe',
        errors: [{msg: 'Invalid title and description type'}],
      });
    }

    if (!Array.isArray(recipe.ingredients) || !Array.isArray(recipe.steps)) {
      return res.status(400).render('recipes/new', {
        title: 'Create Recipe',
        errors: [{msg: 'Invalid list'}],
      });
    }

    for (const ingredient of recipe.ingredients) {
      if (!ingredient && typeof ingredient !== "object" ||
          typeof ingredient.name !== "string" ||
          typeof ingredient.unit !== "string" ||
          !Number.isInteger(ingredient.quantity)) {
        return res.status(400).render('recipes/new', {
          title: 'Create Recipe',
          errors: [{msg: 'Invalid ingredient name, unit or description type'}],
        });
      }
    }

    for (const step of recipe.steps) {
      if (!step && typeof step !== "object" ||
          typeof step.content !== "string" ||
          !Number.isInteger(step.number)) {
        return res.status(400).render('recipes/new', {
          title: 'Create Recipe',
          errors: [{msg: 'Invalid step content or number type'}],
        });
      }
    }

    const userId = req.session.user.id;

    const recipeCreated = await Recipe.create(userId, recipe.title, recipe.description);
    for (const ingredient of recipe.ingredients) {
      await Ingredient.create(recipeCreated.id, ingredient.name, ingredient.unit, ingredient.quantity);
    }
    for (const step of recipe.steps) {
      await Step.create(recipeCreated.id, step.number, step.content);
    }

    console.log("RECIPE FROM DB", recipeCreated);
    res.render("recipes/show", {
      title: "Recipe",
      recipe: recipe,
    });
    console.log("NEW RECIPE END");
  }
  catch (error){
    console.log("NEW RECIPE ERROR");
    console.error('Recipe new error:', error);
    next(error);
  }
}





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