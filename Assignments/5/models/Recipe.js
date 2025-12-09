/**
 * Recipe model
 * Database operations for storing user recipes using PostgreSQL
 */
const { query } = require('../config/database');

const create = async (userId, title, description) => {
  const result = await query(
    `INSERT INTO recipes (user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, title, description, created_at`,
    [userId, title, description]
  );
  return result.rows[0];
};

/**
 * Create or update a recipe for a user
 * Uses upsert to replace existing recipe if one exists
 * @param {number} id - Recipe's ID
 * @param {number} userId - User's ID
 * @param {string} title - Recipe title
 * @param {string} description - Recipe description
 * @returns {Promise<Object>} Created/updated recipe object
 */
const upsert = async (id, userId, title, description) => {
  const result = await query(
    `INSERT INTO recipes (id, user_id, title, description)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (id)
     DO UPDATE SET user_id = $2, title = $3, description = $4, created_at = CURRENT_TIMESTAMP
     RETURNING id, user_id, title, description, created_at`,
    [id, userId, title, description]
  );
  return result.rows[0];
};

/**
 * Find recipes by user ID
 * @param {number} userId - User's ID
 * @returns {Promise<Object|null>} Recipe object or null
 */
const findByUserId = async (userId) => {
  const result = await query(
    `SELECT id, user_id, title, description, created_at
     FROM recipes
     WHERE user_id = $1`,
    [userId]
  );

  return result.rows || null;
};

/**
 * Find a single recipe by id
 * @param {number} id - ID
 * @returns {Promise<Object|null>} Recipe object or null
 */
const findById = async (id) => {
  const result = await query(
    `SELECT id, user_id, title, description, created_at
     FROM recipes
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
};

/**
 * Find all recipes
 
 * @returns {Promise<Object|null>} All Recipes or null
 */
const findAll = async () => {
  const result = await query(
    `SELECT id, user_id, title, description, created_at
     FROM recipes`,
     []
  );

  return result.rows || null;
};

/**
 * Delete recipe by id
 * @param {number} id - Recipe's ID
 * @returns {Promise<boolean>} True if recipe was deleted
 */
const deleteById = async (id) => {
  const result = await query(
    'DELETE FROM recipes WHERE id = $1',
    [id]
  );

  return result.rowCount > 0;
};

module.exports = {
  create,
  upsert,
  findByUserId,
  findById,
  findAll,
  deleteById
};
