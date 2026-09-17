import pool from "../config/db.js";

// Get all products.
async function getAllProducts() {
  const query = `
    SELECT *
    FROM playground_products
    ORDER BY id;
  `;

  const result = await pool.query(query);

  return result.rows;
}

// Get one product by ID.
async function getProductById(id) {
  const query = `
    SELECT *
    FROM playground_products
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
}

// Get all books.
async function getAllBooks() {
  const query = `
    SELECT *
    FROM playground_books
    ORDER BY id;
  `;

  const result = await pool.query(query);

  return result.rows;
}

// Get one book by ID.
async function getBookById(id) {
  const query = `
    SELECT *
    FROM playground_books
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
}

// Get all posts.
async function getAllPosts() {
  const query = `
    SELECT *
    FROM playground_posts
    ORDER BY id;
  `;

  const result = await pool.query(query);

  return result.rows;
}

// Get one post by ID.
async function getPostById(id) {
  const query = `
    SELECT *
    FROM playground_posts
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
}

export default {
  getAllProducts,
  getProductById,
  getAllBooks,
  getBookById,
  getAllPosts,
  getPostById,
};