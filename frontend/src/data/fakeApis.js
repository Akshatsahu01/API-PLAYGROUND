const existingApis = [
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

// Frontend catalog entries for the 47 practice APIs. These are examples for
// the explorer UI; the routes will become live when their backend is added.
const practiceApis = [
  ["students", "Students", "Education", "Manage student profiles, courses, semesters, and enrollment status.", { id: 1, name: "Ava Patel", email: "ava.patel@example.com", course_id: 1, semester: 3, enrollment_status: "active" }],
  ["courses", "Courses", "Education", "Store course titles, descriptions, credits, prerequisites, and instructors.", { id: 1, title: "Introduction to Computer Science", description: "Programming fundamentals and problem solving.", credits: 4, prerequisites: [], instructor: "Dr. Maya Shah" }],
  ["exams", "Exams", "Education", "Create exams with schedules, subjects, total marks, and statuses.", { id: 1, course_id: 1, subject: "Programming Fundamentals", scheduled_at: "2026-11-12T09:00:00Z", total_marks: 100, status: "scheduled" }],
  ["grades", "Grades", "Education", "Manage marks, grades, CGPA, and results linked to students and courses.", { id: 1, student_id: 1, course_id: 1, marks: 88, grade: "A", cgpa: 3.8, result: "passed" }],
  ["library", "Library", "Education", "Search library resources, check availability, borrow books, and record returns.", { id: 1, title: "Clean Code", type: "book", author: "Robert C. Martin", available: true, due_date: null }],
  ["employees", "Employees", "People", "Employee profiles, departments, job titles, and joining dates.", { id: 1, name: "Jordan Lee", email: "jordan.lee@example.com", department: "Engineering", job_title: "Frontend Developer", joined_at: "2024-06-17" }],
  ["companies", "Companies", "People", "Company details, websites, industries, sizes, and locations.", { id: 1, name: "Northstar Labs", website: "https://northstar.example", industry: "Technology", size: "51-200", location: "Austin, TX" }],
  ["teams", "Teams", "People", "Create teams and assign members, leaders, and projects.", { id: 1, name: "Platform", leader_id: 4, member_ids: [4, 7, 9], project_ids: [12], created_at: "2026-01-08" }],
  ["jobs", "Jobs", "People", "Job listings with required skills, salary ranges, locations, and employment types.", { id: 1, title: "Software Engineer", company_id: 1, skills: ["JavaScript", "React"], salary_min: 80000, salary_max: 110000, location: "Remote", employment_type: "full-time" }],
  ["applications", "Applications", "People", "Track job applications through applied, shortlisted, interviewed, and rejected states.", { id: 1, job_id: 1, applicant_id: 8, status: "interviewed", applied_at: "2026-09-22", notes: "Technical interview scheduled" }],
  ["comments", "Comments", "Social", "Add comments to posts, articles, or products.", { id: 1, user_id: 2, resource_type: "post", resource_id: 1, body: "Thanks for sharing this!", created_at: "2026-10-20T10:15:00Z" }],
  ["users", "Users", "Social", "User profiles, usernames, bios, profile pictures, and account settings.", { id: 1, username: "sam_codes", name: "Sam Rivera", bio: "Learning by building.", avatar_url: "https://example.com/avatars/sam.png", settings: { public_profile: true } }],
  ["followers", "Followers", "Social", "Follow and unfollow users, and retrieve follower or following lists.", { id: 1, follower_id: 2, following_id: 1, created_at: "2026-10-01T08:00:00Z" }],
  ["notifications", "Notifications", "Social", "Manage alerts, read status, notification types, and timestamps.", { id: 1, user_id: 1, type: "new_follower", message: "Alex started following you", read: false, created_at: "2026-10-21T09:30:00Z" }],
  ["chats", "Chat", "Social", "Create conversations, send messages, and fetch conversation history.", { id: 1, conversation_id: 3, sender_id: 1, message: "Are we still meeting today?", sent_at: "2026-10-21T09:45:00Z" }],
  ["expenses", "Expenses", "Finance", "Record spending, categories, amounts, dates, and descriptions.", { id: 1, title: "Groceries", category: "food", amount: 42.75, currency: "USD", spent_at: "2026-10-20", description: "Weekly shop" }],
  ["cart", "Cart", "Commerce", "Add products to a cart, update quantities, and remove items.", { id: 1, user_id: 7, items: [{ product_id: 3, quantity: 2, unit_price: 14.5 }], total: 29 }],
  ["orders", "Orders", "Commerce", "Manage orders, line items, totals, shipping addresses, and order status.", { id: 1, customer_id: 7, items: [{ product_id: 3, quantity: 2 }], total: 29, status: "processing", shipping_address: { city: "Austin", country: "US" } }],
  ["invoices", "Invoices", "Finance", "Generate sample invoices with due dates, line items, taxes, and payment status.", { id: 1, customer_id: 7, due_date: "2026-11-20", line_items: [{ description: "Design work", quantity: 2, unit_price: 150 }], subtotal: 300, tax: 24, total: 324, status: "unpaid" }],
  ["coupons", "Coupons", "Commerce", "Create discount codes with expiry dates, minimum orders, and usage limits.", { id: 1, code: "WELCOME10", discount_percent: 10, expires_at: "2026-12-31", minimum_order: 25, usage_limit: 500, active: true }],
  ["flights", "Flights", "Travel", "Flight numbers, origins, destinations, departure times, and seat availability.", { id: 1, flight_number: "NP204", origin: "SFO", destination: "JFK", departure_at: "2026-11-15T16:30:00Z", seats_available: 24, status: "on-time" }],
  ["hotels", "Hotels", "Travel", "Search hotels by city, rating, price, and available amenities.", { id: 1, name: "Harbor House", city: "Seattle", rating: 4.6, price_per_night: 189, amenities: ["wifi", "pool", "breakfast"] }],
  ["destinations", "Destinations", "Travel", "Tourist destinations with descriptions, estimated budgets, and attractions.", { id: 1, name: "Kyoto", country: "Japan", description: "Historic temples and traditional gardens.", estimated_budget: 1200, attractions: ["Fushimi Inari", "Arashiyama"] }],
  ["bus-routes", "Bus Routes", "Travel", "Bus routes, stops, departure schedules, fares, and travel durations.", { id: 1, route_number: "R12", stops: ["Central Station", "Riverside", "Airport"], departure_at: "2026-10-21T11:00:00Z", fare: 3.5, duration_minutes: 42 }],
  ["properties", "Properties", "Travel", "Rental properties with locations, monthly rent, bedrooms, and amenities.", { id: 1, title: "Sunny two-bedroom flat", city: "Portland", monthly_rent: 1850, bedrooms: 2, amenities: ["parking", "laundry"] }],
  ["recipes", "Recipes", "Lifestyle", "Store ingredients, preparation steps, cooking times, and dietary tags.", { id: 1, title: "Chickpea Curry", ingredients: ["chickpeas", "tomatoes", "coconut milk"], steps: ["Saute aromatics", "Simmer ingredients"], cooking_minutes: 35, dietary_tags: ["vegan", "gluten-free"] }],
  ["workouts", "Workouts", "Lifestyle", "Exercises, muscle groups, sets, repetitions, and workout plans.", { id: 1, name: "Upper Body A", exercises: [{ name: "Push-up", muscle_group: "chest", sets: 3, repetitions: 12 }], duration_minutes: 30 }],
  ["habits", "Habit Tracker", "Lifestyle", "Track habits, completion dates, daily streaks, and progress.", { id: 1, name: "Read for 20 minutes", completed_dates: ["2026-10-19", "2026-10-20"], current_streak: 2, target_per_week: 5 }],
  ["sleep-records", "Sleep Records", "Lifestyle", "Record sleep and wake times, duration, and subjective sleep quality.", { id: 1, user_id: 1, slept_at: "2026-10-20T22:45:00Z", woke_at: "2026-10-21T06:45:00Z", duration_hours: 8, quality: "good" }],
  ["moods", "Mood Tracker", "Lifestyle", "Store daily mood entries, optional notes, and mood categories.", { id: 1, user_id: 1, mood: "calm", note: "A quiet, focused day", recorded_at: "2026-10-21" }],
  ["movies", "Movies", "Entertainment", "Movie titles, genres, release years, directors, and ratings.", { id: 1, title: "The Last Signal", genres: ["mystery", "drama"], release_year: 2024, director: "Nora Wells", rating: 7.8 }],
  ["music", "Music", "Entertainment", "Tracks, artists, albums, genres, and durations.", { id: 1, title: "City Lights", artist: "The Paper Planes", album: "After Hours", genre: "indie", duration_seconds: 214 }],
  ["games", "Games", "Entertainment", "Video games with platforms, genres, release dates, and age ratings.", { id: 1, title: "Star Harbor", platforms: ["PC", "PlayStation 5"], genre: "adventure", release_date: "2025-04-18", age_rating: "T" }],
  ["news", "News", "Entertainment", "Sample articles with headlines, authors, categories, publication dates, and tags.", { id: 1, headline: "City expands its night bus service", author: "Taylor Kim", category: "Local", published_at: "2026-10-21T07:00:00Z", tags: ["transit", "city"] }],
  ["podcasts", "Podcasts", "Entertainment", "Podcast shows and episodes, durations, hosts, and release dates.", { id: 1, show: "Small Ideas", episode: "How maps shape a city", host: "Jamie Chen", duration_seconds: 1860, released_at: "2026-10-18" }],
  ["todos", "Todos", "Developer", "Manage tasks with titles, priorities, completion status, and deadlines.", { id: 1, title: "Review API responses", priority: "high", completed: false, due_date: "2026-10-25" }],
  ["snippets", "Code Snippets", "Developer", "Save code examples with programming languages, tags, and descriptions.", { id: 1, title: "Fetch JSON", language: "javascript", code: "fetch('/api/items').then(r => r.json())", tags: ["fetch", "http"], description: "A small fetch example" }],
  ["servers", "Servers", "Developer", "Simulated servers with status, region, CPU usage, and memory usage.", { id: 1, name: "api-node-01", status: "healthy", region: "us-west", cpu_percent: 34, memory_percent: 61 }],
  ["webhooks", "Webhooks", "Developer", "Register fake webhook subscriptions and inspect simulated delivery attempts.", { id: 1, url: "https://example.com/hooks/orders", event: "order.created", active: true, last_delivery: { status: "delivered", status_code: 200 } }],
  ["errors", "Error Simulator", "Developer", "Trigger example HTTP errors and inspect their response formats.", { error: "Not Found", message: "The requested sample resource was not found.", status: 404, path: "/api/errors/404" }],
  ["countries", "Countries", "Data", "Country names, capitals, regions, populations, and currencies.", { id: 1, name: "New Zealand", capital: "Wellington", region: "Oceania", population: 5228100, currency: "NZD" }],
  ["space", "Space", "Science", "Simulated planets, moons, orbital periods, and planetary properties.", { id: 1, name: "Kepler-186f", type: "planet", orbit_days: 129.9, radius_earths: 1.17, moons: [] }],
  ["weather-records", "Weather Records", "Science", "Fictional weather observations by city, temperature, humidity, and conditions.", { id: 1, city: "Bristol", observed_at: "2026-10-21T08:00:00Z", temperature_c: 14.2, humidity_percent: 68, condition: "light-rain" }],
  ["statistics", "Statistics", "Science", "Sample datasets and computed summaries such as averages, counts, and distributions.", { dataset: "monthly-visits", count: 4, average: 128.5, distribution: { direct: 120, search: 137 } }],
  ["locations", "Locations", "Data", "Fictional locations with coordinates, addresses, and location categories.", { id: 1, name: "Riverside Park", category: "park", address: "10 River Walk", latitude: 45.5231, longitude: -122.6765 }],
  ["auth", "Authentication", "Advanced", "Simulate registration, login, token issuance, and protected sample routes.", { access_token: "sample-token-abc123", token_type: "Bearer", expires_in: 3600, user: { id: 1, username: "demo_student" } }],
  ["request-tests", "Request Testing", "Advanced", "Try predefined scenarios for headers, query parameters, request bodies, and response formats.", { scenario: "json-validation", status: 200, content_type: "application/json", received_headers: { "content-type": "application/json" }, message: "Request format looks good." }],
];

function createPracticeApi([id, title, category, short_desc, sample_response]) {
  const baseUrl = `/api/${id}`;
  const collectionName = title.toLowerCase();
  const endpoints = [
    { method: "GET", path: baseUrl, description: `Returns the ${collectionName} collection. Supports query parameters for search, filtering, sorting, and pagination practice.` },
    { method: "GET", path: `${baseUrl}/:id`, description: `Returns one ${collectionName.replace(/s$/, "")} using its ID.` },
    { method: "POST", path: baseUrl, description: `Validates a new ${collectionName.replace(/s$/, "")} request and returns a simulated response.` },
    { method: "PUT", path: `${baseUrl}/:id`, description: "Validates a full update request and returns a simulated success; no data is saved." },
    { method: "PATCH", path: `${baseUrl}/:id`, description: "Validates a partial update request and returns the updated sample; no data is saved." },
    { method: "DELETE", path: `${baseUrl}/:id`, description: "Returns a simulated deletion response; no data is removed." },
  ];
  if (id === "errors") {
    endpoints.push({ method: "GET", path: `${baseUrl}/:status`, description: "Returns a simulated HTTP error response for statuses such as 400, 401, 403, 404, 429, or 500." });
  }
  if (id === "auth") {
    endpoints.push({ method: "POST", path: `${baseUrl}/register`, description: "Validates registration fields and returns a simulated user." });
    endpoints.push({ method: "POST", path: `${baseUrl}/login`, description: "Validates login credentials and returns a sample bearer token." });
  }
  if (id === "chats") {
    endpoints.push({ method: "GET", path: `${baseUrl}/:id/messages`, description: "Returns messages in chronological order for a conversation." });
    endpoints.push({ method: "POST", path: `${baseUrl}/:id/messages`, description: "Validates and simulates sending a message." });
  }
  if (id === "webhooks") {
    endpoints.push({ method: "GET", path: `${baseUrl}/:id/deliveries`, description: "Returns simulated delivery attempts for this subscription." });
  }
  return {
    id, name: `${title} API`, short_desc, category,
    tags: [id, category.toLowerCase(), "json", "rest"],
    base_url: baseUrl,
    description: `${short_desc} GET requests read sample records from PostgreSQL. POST, PUT, PATCH, and DELETE requests validate input and return simulated results without changing the database.`,
    endpoints,
    sample_response,
    usage_snippet: `fetch("${baseUrl}")\n  .then((response) => response.json())\n  .then((data) => console.log(data));`,
    request_example: id === "auth"
      ? { name: "Demo Student", email: "student@example.com", password: "sample-password" }
      : sample_response,
    practiceApi: true,
  };
}

const fakeApis = [...existingApis, ...practiceApis.map(createPracticeApi)];

export default fakeApis;
