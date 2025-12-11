/**
 * Step model
 * Database operations for storing recipe steps using PostgreSQL
 */
const { query } = require('../config/database');

const create = async (recipeId, number, content) => {
  const result = await query(
    `INSERT INTO steps (recipe_id, number, content)
    VALUES ($1, $2, $3)
    RETURNING id, recipe_id, number, content, created_at`,
    [recipeId, number, content]
  );
  return result.rows[0];
};

/**
 * Create or update a step for a recipe
 * Uses upsert to replace existing step if one exists
 * @param {number} id - Step's ID
 * @param {number} recipeId - Recipe's ID
 * @param {number} number - Step number
 * @param {string} content - Content directions for the step
 * @returns {Promise<Object>} Created/updated step object
 */
const upsert = async (id, recipeId, number, content) => {
  const result = await query(
    `INSERT INTO steps (id, recipe_id, number, content)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (id)
     DO UPDATE SET recipe_id = $2, number = $3, content = $4, created_at = CURRENT_TIMESTAMP
     RETURNING id, recipe_id, number, content, created_at`,
    [id, recipeId, number, content]
  );

  return result.rows[0];
};

/**
 * Find steps by recipe ID
 * @param {number} recipeId - Recipe's ID
 * @returns {Promise<Object|null>} Step object or null
 */
const findByRecipeId = async (recipeId) => {
  const result = await query(
    `SELECT id, recipe_id, number, content, created_at
     FROM steps
     WHERE recipe_id = $1`,
    [recipeId]
  );

  return result.rows || null;
};

/**
 * Delete step by id
 * @param {number} id - Step's ID
 * @returns {Promise<boolean>} True if step was deleted
 */
const deleteById = async (id) => {
  const result = await query(
    'DELETE FROM steps WHERE id = $1',
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
