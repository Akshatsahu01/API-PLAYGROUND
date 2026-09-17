import sampleDataModel from "../models/sampleDataModel.js";

// Products
async function getAllProducts() {
  return await sampleDataModel.getAllProducts();
}

async function getProductById(id) {
  return await sampleDataModel.getProductById(id);
}

function validateProductInput(data) {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      errors: ["Request body must be a JSON object"],
    };
  }

  if (
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.push("title is required and must be a non-empty string");
  }

  if (
    typeof data.price !== "number" ||
    !Number.isFinite(data.price) ||
    data.price < 0
  ) {
    errors.push("price must be a non-negative number");
  }

  if (
    typeof data.category !== "string" ||
    data.category.trim().length === 0
  ) {
    errors.push("category is required and must be a non-empty string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Books
async function getAllBooks() {
  return await sampleDataModel.getAllBooks();
}

async function getBookById(id) {
  return await sampleDataModel.getBookById(id);
}

function validateBookInput(data) {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      errors: ["Request body must be a JSON object"],
    };
  }

  if (
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.push("title is required and must be a non-empty string");
  }

  if (
    typeof data.author !== "string" ||
    data.author.trim().length === 0
  ) {
    errors.push("author is required and must be a non-empty string");
  }

  if (
    typeof data.genre !== "string" ||
    data.genre.trim().length === 0
  ) {
    errors.push("genre is required and must be a non-empty string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Posts
async function getAllPosts() {
  return await sampleDataModel.getAllPosts();
}

async function getPostById(id) {
  return await sampleDataModel.getPostById(id);
}

function validatePostInput(data) {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      valid: false,
      errors: ["Request body must be a JSON object"],
    };
  }

  if (
    !Number.isSafeInteger(data.userId) ||
    data.userId <= 0
  ) {
    errors.push("userId must be a positive integer");
  }

  if (
    typeof data.title !== "string" ||
    data.title.trim().length === 0
  ) {
    errors.push("title is required and must be a non-empty string");
  }

  if (
    typeof data.body !== "string" ||
    data.body.trim().length === 0
  ) {
    errors.push("body is required and must be a non-empty string");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export default {
  getAllProducts,
  getProductById,
  validateProductInput,

  getAllBooks,
  getBookById,
  validateBookInput,

  getAllPosts,
  getPostById,
  validatePostInput,

};