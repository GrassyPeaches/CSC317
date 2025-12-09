/**
 * Ingredient model
 * Database operations for storing recipe ingredients using PostgreSQL
 */
const { query } = require('../config/database');

const create = async (recipeId, name, unit, quantity) => {
  const result = await query(
    `INSERT INTO ingredients (recipe_id, name, unit, quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING id, recipe_id, name, unit, quantity, created_at`,
    [recipeId, name, unit, quantity]
  );
  return result.rows[0];
};

/**
 * Create or update a ingredient for a recipe
 * Uses upsert to replace existing ingredient if one exists
 * @param {number} id - Ingredient's ID
 * @param {number} recipeId - Recipe's ID
 * @param {string} name - Ingredient name
 * @param {string} unit - Unit of measurement for the ingredient
 * @param {number} quantity- Quantity of the ingredient
 * @returns {Promise<Object>} Created/updated ingredient object
 */
const upsert = async (id, recipeId, name, unit, quantity) => {
  const result = await query(
    `INSERT INTO ingredients (id, recipe_id, name, unit, quantity)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id)
     DO UPDATE SET recipe_id = $2, name = $3, unit = $4, quantity = $5, created_at = CURRENT_TIMESTAMP
     RETURNING id, recipe_id, unit, quantity, created_at`,
    [id, recipeId, name, unit, quantity]
  );

  return result.rows[0];
};

/**
 * Find ingredients by recipe ID
 * @param {number} recipeId - Recipe's ID
 * @returns {Promise<Object|null>} Ingredient object or null
 */
const findByRecipeId = async (recipeId) => {
  const result = await query(
    `SELECT id, recipe_id, name, unit, quantity, created_at
     FROM ingredients
     WHERE recipe_id = $1`,
    [recipeId]
  );

  return result.rows || null;
};

/**
 * Delete ingredient by id
 * @param {number} id - Ingredient's ID
 * @returns {Promise<boolean>} True if ingredient was deleted
 */
const deleteById = async (id) => {
  const result = await query(
    'DELETE FROM ingredients WHERE id = $1',
    [id]
  );

  return result.rowCount > 0;
};

module.exports = {
  create,
  upsert,
  findByRecipeId,
  deleteById
};
