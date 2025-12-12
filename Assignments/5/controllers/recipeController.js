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