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
    console.log("POST NEW RECIPE");

    const userId = req.session.user.id;
    const { title, description, ingredients, steps } = req.body;

    // 1️⃣ Validate basic types
    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).render("recipes/new", {
        errors: [{ msg: "Title and description must be text" }],
      });
    }

    // 2️⃣ Validate ingredients & steps are arrays
    if (!Array.isArray(ingredients) || !Array.isArray(steps)) {
      return res.status(400).render("recipes/new", {
        errors: [{ msg: "Ingredients and steps must be lists" }],
      });
    }

    // 3️⃣ Create main recipe
    const recipeCreated = await Recipe.create(userId, title, description);
    console.log("Recipe Created:", recipeCreated);

    // 4️⃣ Insert ingredients
    for (const item of ingredients) {
      await Ingredient.create(
        recipeCreated.id,
        item.name,
        item.unit,
        item.quantity
      );
    }

    // 5️⃣ Insert steps
    for (const step of steps) {
      await Step.create(
        recipeCreated.id,
        step.number,
        step.content
      );
    }

    // 6️⃣ Fetch complete recipe for display
    const fullRecipe = await Recipe.findById(recipeCreated.id);
    fullRecipe.ingredients = await Ingredient.findByRecipeId(recipeCreated.id);
    fullRecipe.steps = await Step.findByRecipeId(recipeCreated.id);

    // 7️⃣ Redirect to the real recipe page
    return res.redirect(`/recipes/${recipeCreated.id}`);

  } catch (error) {
    console.log("NEW RECIPE ERROR");
    console.error(error);
    next(error);
  }
};


/**
 * Edit recipe page
 */
exports.getEditRecipe = async (req, res) => {
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

  res.render("recipes/edit", {
    title: "Recipe",
    recipe: recipe,
  });
};

/**
 * Edit a recipe
 */
exports.postEditRecipe = async (req, res, next) => {
  try {
    console.log("EDIT RECIPE");
    const recipe = {};
    console.log("BODY!")
    console.log(req.body);

    recipe.id = req.body.id;
    recipe.title = req.body.title;
    recipe.description = req.body.description;

    // ingredients and steps should be an array

    recipe.ingredients = req.body.ingredients;
    recipe.steps = req.body.steps;
    console.log("RECIPE")
    console.log(recipe);

    if ( !Number.isInteger(recipe.id)) {
      return res.status(400).render('recipes/edit', {
        title: 'Edit Recipe',
        errors: [{msg: 'Invalid recipe Id type'}],
      });
    }

    if (await Recipe.findById(req.params.id) == null) {
      return res.status(404).render("/error");
    }

    if (typeof recipe.title !== 'string' || typeof recipe.description !== 'string') {
      return res.status(400).render('recipes/edit', {
        title: 'Edit Recipe',
        errors: [{msg: 'Invalid title and description type'}],
      });
    }

    if (!Array.isArray(recipe.ingredients) || !Array.isArray(recipe.steps)) {
      return res.status(400).render('recipes/edit', {
        title: 'Edit Recipe',
        errors: [{msg: 'Invalid list'}],
      });
    }

    for (const ingredient of recipe.ingredients) {
      if (!ingredient && typeof ingredient !== "object" ||
          typeof ingredient.name !== "string" ||
          typeof ingredient.unit !== "string" ||
          !Number.isInteger(ingredient.quantity)) {
        return res.status(400).render('recipes/edit', {
          title: 'Edit Recipe',
          errors: [{msg: 'Invalid ingredient name, unit or description type'}],
        });
      }
    }

    for (const step of recipe.steps) {
      if (!step && typeof step !== "object" ||
          typeof step.content !== "string" ||
          !Number.isInteger(step.number)) {
        return res.status(400).render('recipes/edit', {
          title: 'Edit Recipe',
          errors: [{msg: 'Invalid step content or number type'}],
        });
      }
    }

    const userId = req.session.user.id;

    const recipeCreated = await Recipe.upsert(recipe.id, userId, recipe.title, recipe.description);
    for (const ingredient of recipe.ingredients) {
      await Ingredient.upsert(recipe.id, recipeCreated.id, ingredient.name, ingredient.unit, ingredient.quantity);
    }
    for (const step of recipe.steps) {
      await Step.upsert(recipe.id, recipeCreated.id, step.number, step.content);
    }

    console.log("RECIPE FROM DB", recipeCreated);
    res.render("recipes/edit", {
      title: "Recipe",
      recipe: recipe,
    });
    console.log("EDIT RECIPE END");
  }
  catch (error){
    console.log("EDIT RECIPE ERROR");
    console.error('Recipe edit error:', error);
    next(error);
  }
}

/**
/**
 * Delete a recipe
 */
exports.deleteRecipe = async (req, res) => {
  try {
    const user = { ...req.session.user };

    // 1. Find the recipe first
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render("error");
    }

    // 2. SECURITY CHECK — Only allow deleting your own recipe
    if (recipe.user_id !== user.id) {
      return res.status(403).render("error");
    }

    // 3. Delete the recipe
    await Recipe.deleteById(recipe.id);

    // 4. Redirect so profile loads fresh updated recipes
    return res.redirect("/user/profile");
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).render("error");
  }
};
