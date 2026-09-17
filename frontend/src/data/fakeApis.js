const fakeApis = [
  {
    id: "products",
    name: "Products API",
    short_desc:
      "Explore product data and test product order requests.",
    category: "E-commerce",
    tags: ["products", "shopping", "post", "json"],
    base_url: "/api/products",
    description:
      "The Products API provides sample product data. You can fetch all products, fetch a product by ID, and test a product order request.",
    endpoints: [
      {
        method: "GET",
        path: "/api/products",
        description: "Returns all products."
      },
      {
        method: "GET",
        path: "/api/products/:id",
        description: "Returns one product using its ID."
      },
      {
        method: "POST",
        path: "/api/products/order",
        description:
          "Validates product input and returns a success or failure response. It does not save anything to the database."
      }
    ],
    sample_response: {
      id: 1,
      title: "Laptop",
      price: "55000.00",
      description: "A powerful laptop for programming and office work.",
      category: "electronics",
      image_url: "https://example.com/images/laptop.jpg",
      rating: "4.5",
      stock: 25
    },
    usage_snippet: `fetch("/api/products")
  .then((response) => response.json())
  .then((data) => console.log(data));`
  },
  {
    id: "books",
    name: "Books API",
    short_desc:
      "Explore books and test book purchase request validation.",
    category: "Books",
    tags: ["books", "authors", "genres", "post"],
    base_url: "/api/books",
    description:
      "The Books API provides sample book records. You can retrieve all books, retrieve one book by ID, and test a book purchase request.",
    endpoints: [
      {
        method: "GET",
        path: "/api/books",
        description: "Returns all books."
      },
      {
        method: "GET",
        path: "/api/books/:id",
        description: "Returns one book using its ID."
      },
      {
        method: "POST",
        path: "/api/books/buy",
        description:
          "Validates book input and returns a success or failure response. It does not modify the database."
      }
    ],
    sample_response: {
      id: 1,
      title: "The Hobbit",
      author: "J. R. R. Tolkien",
      genre: "Fantasy",
      description: "A fantasy adventure about Bilbo Baggins.",
      published_year: 1937,
      isbn: "9780547928227"
    },
    usage_snippet: `fetch("/api/books")
  .then((response) => response.json())
  .then((data) => console.log(data));`
  },
  {
    id: "posts",
    name: "Posts API",
    short_desc:
      "Explore posts and test post creation requests.",
    category: "Social",
    tags: ["posts", "users", "social", "json"],
    base_url: "/api/posts",
    description:
      "The Posts API provides sample social posts. You can retrieve all posts, retrieve one post by ID, and validate a new post request without saving it.",
    endpoints: [
      {
        method: "GET",
        path: "/api/posts",
        description: "Returns all posts."
      },
      {
        method: "GET",
        path: "/api/posts/:id",
        description: "Returns one post using its ID."
      },
      {
        method: "POST",
        path: "/api/posts/post",
        description:
          "Validates post input and returns a success or failure response. It does not insert a new record."
      }
    ],
    sample_response: {
      id: 1,
      user_id: 1,
      title: "Finally Fixed That Bug",
      body:
        "Spent almost two hours debugging a tiny issue in my code."
    },
    usage_snippet: `fetch("/api/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));`
  }
];

export default fakeApis;