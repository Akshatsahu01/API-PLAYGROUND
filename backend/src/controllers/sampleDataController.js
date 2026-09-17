import sampleDataService from "../services/sampleDataServices.js";

// Check whether an ID is a positive integer.
function isValidId(id) {
  return /^[1-9]\d*$/.test(id);
}

// Get all products.
export async function getAllProducts(req, res) {
  try {
    const products = await sampleDataService.getAllProducts();

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
}

// Get one product by ID.
export async function getProductById(req, res) {
  const id = req.params.id;

  if (!isValidId(id)) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    const product = await sampleDataService.getProductById(
      Number(id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
}

export async function orderProduct(req, res) {
  try {
    const result = sampleDataService.validateProductInput(req.body);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: "Product input is invalid",
        errors: result.errors,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product ordered",
      data: req.body,
    });
  } catch (error) {
    console.error("Error validating product input:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to validate product input",
    });
  }
}

// Get all books.
export async function getAllBooks(req, res) {
  try {
    const books = await sampleDataService.getAllBooks();

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);

    res.status(500).json({
      message: "Failed to fetch books",
    });
  }
}

// Get one book by ID.
export async function getBookById(req, res) {
  const id = req.params.id;

  if (!isValidId(id)) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    const book = await sampleDataService.getBookById(
      Number(id)
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);

    res.status(500).json({
      message: "Failed to fetch book",
    });
  }
}

export async function orderBook(req, res) {
  try {
    const result = sampleDataService.validateBookInput(req.body);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: "Book input is invalid",
        errors: result.errors,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book ordered",
      data: req.body,
    });
  } catch (error) {
    console.error("Error validating book input:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to validate book input",
    });
  }
}

// Get all posts.
export async function getAllPosts(req, res) {
  try {
    const posts = await sampleDataService.getAllPosts();

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);

    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
}

// Get one post by ID.
export async function getPostById(req, res) {
  const id = req.params.id;

  if (!isValidId(id)) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    const post = await sampleDataService.getPostById(
      Number(id)
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);

    res.status(500).json({
      message: "Failed to fetch post",
    });
  }
}

// Test post input without saving it to the database.
export async function createPost(req, res) {
  try {
    const result = sampleDataService.validatePostInput(req.body);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: "Post input is invalid",
        errors: result.errors,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: req.body,
    });
  } catch (error) {
    console.error("Error validating post input:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to validate post input",
    });
  }
}