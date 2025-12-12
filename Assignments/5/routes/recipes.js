const express = require('express');
const recipeController = require("../controllers/recipeController");
const {isNotAuthenticated, isAuthenticated} = require("../middlewares/auth");
const router = express.Router();

// Show the create recipe page
router.get('/new', (req, res) => {
  res.render('recipes/new', {
    title: 'Create Recipe'
  });
});


// GET /recipes/:id - User recipe page
router.get('/:id', recipeController.getRecipe);

//GET /recipes/ - All recipes
router.get('/', recipeController.getAllRecipes);

router.post('/new', isAuthenticated, recipeController.postNewRecipe);

// Show a single recipe
/*router.get('/:id', (req, res) => {
  const recipe = {
    title: "Chicken Biryani",
    description:
      "A fragrant, flavorful rice dish made with marinated chicken, basmati rice, fried onions, and traditional spices. Perfect for family dinners or special occasions.",

    ingredients: [
      "2 cups basmati rice",
      "500g chicken (bone-in preferred)",
      "1 cup yogurt",
      "2 large onions (fried)",
      "2 tomatoes (chopped)",
      "2 tbsp ginger garlic paste",
      "1/2 cup fresh coriander",
      "1/2 cup mint leaves",
      "1 tbsp biryani masala",
      "1 tsp turmeric powder",
      "1 tsp red chili powder",
      "Whole spices (bay leaf, cloves, cinnamon, cardamom)",
      "Salt to taste",
      "3 tbsp oil or ghee"
    ],

    instructions: [
      "Wash and soak basmati rice for 20 minutes.",
      "Marinate chicken with yogurt, spices, and ginger garlic paste. Rest 30 minutes.",
      "Heat oil/ghee, add whole spices, and sauté until fragrant.",
      "Add chicken and cook until oil separates.",
      "Add tomatoes, mint, and coriander. Cook 5 minutes.",
      "Boil rice until 70% cooked; drain.",
      "Layer rice over chicken with fried onions.",
      "Cover and cook on low heat (dum) for 20–25 minutes.",
      "Fluff gently and serve hot."
    ],

    tags: ["biryani", "chicken", "rice", "pakistani"],
    likes: 18
  };

  res.render('recipes/show', {
    title: recipe.title, // 🔥 This fixes your “title is not defined” error
    recipe
  });
});
 */

// Export router (must be at bottom)
module.exports = router;
