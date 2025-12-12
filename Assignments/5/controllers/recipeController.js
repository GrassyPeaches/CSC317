/**
 * Recipe Controller
 * Handles the logic for user recipes
 */
const { validationResult } = require("express-validator");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Step = require("../models/Step");
const RecipeImage = require("../models/RecipeImage");
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
 * Display all recipes
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