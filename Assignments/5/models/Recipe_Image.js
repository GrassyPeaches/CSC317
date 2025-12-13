/**
 * Recipe Image model
 * Database operations for storing recipe images using PostgreSQL
 */
const { query } = require('../config/database');

/**
 * Create or update a recipe image for a user
 * Uses upsert to replace existing image if one exists
 * @param {number} id - Recipe's Image ID
 * @param {number} recipeId - Recipe's ID
 * @param {Buffer} data - Recipe's Image binary data
 * @param {string} contentType - MIME type of the image
 * @returns {Promise<Object>} Created/updated image object
 */

const create = async (recipeId, data,contentType) => {
    const result = await query(
        `INSERT INTO recipe_images (recipe_id, data, content_type)
         VALUES ($1, $2, $3)
             RETURNING id, recipe_id, data, contentType, created_at`,
        [recipeId, data, contentType]
    );
    return result.rows[0];
};

const upsert = async (id, recipeId, data, contentType) => {
    const result = await query(
        `INSERT INTO recipe_images (id, recipe_id, data, content_type)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (id)
     DO UPDATE SET recipe_id = $2, data = $3, content_type = $4, created_at = CURRENT_TIMESTAMP
     RETURNING id, recipe_id, content_type, created_at`,
        [id,recipeId, data, contentType]
    );

    return result.rows[0];
};

/**
 * Find recipe image by recipe ID
 * @param {number} recipeId - Recipe's ID
 * @returns {Promise<Object|null>} Image object with data or null
 */
const findByRecipeId = async (recipeId) => {
    const result = await query(
        `SELECT id, recipe_id, data, content_type, created_at
     FROM profile_images
     WHERE recipe_id = $1`,
        [recipeId]
    );

    return result.rows[0] || null;
};

/**
 * Delete profile image by recipe ID
 * @param {number} recipeId - Recipe's ID
 * @returns {Promise<boolean>} True if image was deleted
 */
const deleteByRecipeId = async (recipeId) => {
    const result = await query(
        'DELETE FROM profile_images WHERE recipe_id = $1',
        [recipeId]
    );

    return result.rowCount > 0;
};

module.exports = {
    upsert,
    findByRecipeId,
    deleteByRecipeId
};
