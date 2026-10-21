// Generated from frontend/src/data/fakeApis.js.
export const practiceApiTables = {
  "students": {
    "tableName": "playground_students",
    "fields": {
      "name": "string",
      "email": "string",
      "course_id": "number",
      "semester": "number",
      "enrollment_status": "string"
    }
  },
  "courses": {
    "tableName": "playground_courses",
    "fields": {
      "title": "string",
      "description": "string",
      "credits": "number",
      "prerequisites": "array",
      "instructor": "string"
    }
  },
  "exams": {
    "tableName": "playground_exams",
    "fields": {
      "course_id": "number",
      "subject": "string",
      "scheduled_at": "string",
      "total_marks": "number",
      "status": "string"
    }
  },
  "grades": {
    "tableName": "playground_grades",
    "fields": {
      "student_id": "number",
      "course_id": "number",
      "marks": "number",
      "grade": "string",
      "cgpa": "number",
      "result": "string"
    }
  },
  "library": {
    "tableName": "playground_library",
    "fields": {
      "title": "string",
      "type": "string",
      "author": "string",
      "available": "boolean",
      "due_date": "any"
    }
  },
  "employees": {
    "tableName": "playground_employees",
    "fields": {
      "name": "string",
      "email": "string",
      "department": "string",
      "job_title": "string",
      "joined_at": "string"
    }
  },
  "companies": {
    "tableName": "playground_companies",
    "fields": {
      "name": "string",
      "website": "string",
      "industry": "string",
      "size": "string",
      "location": "string"
    }
  },
  "teams": {
    "tableName": "playground_teams",
    "fields": {
      "name": "string",
      "leader_id": "number",
      "member_ids": "array",
      "project_ids": "array",
      "created_at": "string"
    }
  },
  "jobs": {
    "tableName": "playground_jobs",
    "fields": {
      "title": "string",
      "company_id": "number",
      "skills": "array",
      "salary_min": "number",
      "salary_max": "number",
      "location": "string",
      "employment_type": "string"
    }
  },
  "applications": {
    "tableName": "playground_applications",
    "fields": {
      "job_id": "number",
      "applicant_id": "number",
      "status": "string",
      "applied_at": "string",
      "notes": "string"
    }
  },
  "comments": {
    "tableName": "playground_comments",
    "fields": {
      "user_id": "number",
      "resource_type": "string",
      "resource_id": "number",
      "body": "string",
      "created_at": "string"
    }
  },
  "users": {
    "tableName": "playground_users",
    "fields": {
      "username": "string",
      "name": "string",
      "bio": "string",
      "avatar_url": "string",
      "settings": "object"
    }
  },
  "followers": {
    "tableName": "playground_followers",
    "fields": {
      "follower_id": "number",
      "following_id": "number",
      "created_at": "string"
    }
  },
  "notifications": {
    "tableName": "playground_notifications",
    "fields": {
      "user_id": "number",
      "type": "string",
      "message": "string",
      "read": "boolean",
      "created_at": "string"
    }
  },
  "chats": {
    "tableName": "playground_chats",
    "fields": {
      "conversation_id": "number",
      "sender_id": "number",
      "message": "string",
      "sent_at": "string"
    }
  },
  "expenses": {
    "tableName": "playground_expenses",
    "fields": {
      "title": "string",
      "category": "string",
      "amount": "number",
      "currency": "string",
      "spent_at": "string",
      "description": "string"
    }
  },
  "cart": {
    "tableName": "playground_cart",
    "fields": {
      "user_id": "number",
      "items": "array",
      "total": "number"
    }
  },
  "orders": {
    "tableName": "playground_orders",
    "fields": {
      "customer_id": "number",
      "items": "array",
      "total": "number",
      "status": "string",
      "shipping_address": "object"
    }
  },
  "invoices": {
    "tableName": "playground_invoices",
    "fields": {
      "customer_id": "number",
      "due_date": "string",
      "line_items": "array",
      "subtotal": "number",
      "tax": "number",
      "total": "number",
      "status": "string"
    }
  },
  "coupons": {
    "tableName": "playground_coupons",
    "fields": {
      "code": "string",
      "discount_percent": "number",
      "expires_at": "string",
      "minimum_order": "number",
      "usage_limit": "number",
      "active": "boolean"
    }
  },
  "flights": {
    "tableName": "playground_flights",
    "fields": {
      "flight_number": "string",
      "origin": "string",
      "destination": "string",
      "departure_at": "string",
      "seats_available": "number",
      "status": "string"
    }
  },
  "hotels": {
    "tableName": "playground_hotels",
    "fields": {
      "name": "string",
      "city": "string",
      "rating": "number",
      "price_per_night": "number",
      "amenities": "array"
    }
  },
  "destinations": {
    "tableName": "playground_destinations",
    "fields": {
      "name": "string",
      "country": "string",
      "description": "string",
      "estimated_budget": "number",
      "attractions": "array"
    }
  },
  "bus-routes": {
    "tableName": "playground_bus_routes",
    "fields": {
      "route_number": "string",
      "stops": "array",
      "departure_at": "string",
      "fare": "number",
      "duration_minutes": "number"
    }
  },
  "properties": {
    "tableName": "playground_properties",
    "fields": {
      "title": "string",
      "city": "string",
      "monthly_rent": "number",
      "bedrooms": "number",
      "amenities": "array"
    }
  },
  "recipes": {
    "tableName": "playground_recipes",
    "fields": {
      "title": "string",
      "ingredients": "array",
      "steps": "array",
      "cooking_minutes": "number",
      "dietary_tags": "array"
    }
  },
  "workouts": {
    "tableName": "playground_workouts",
    "fields": {
      "name": "string",
      "exercises": "array",
      "duration_minutes": "number"
    }
  },
  "habits": {
    "tableName": "playground_habits",
    "fields": {
      "name": "string",
      "completed_dates": "array",
      "current_streak": "number",
      "target_per_week": "number"
    }
  },
  "sleep-records": {
    "tableName": "playground_sleep_records",
    "fields": {
      "user_id": "number",
      "slept_at": "string",
      "woke_at": "string",
      "duration_hours": "number",
      "quality": "string"
    }
  },
  "moods": {
    "tableName": "playground_moods",
    "fields": {
      "user_id": "number",
      "mood": "string",
      "note": "string",
      "recorded_at": "string"
    }
  },
  "movies": {
    "tableName": "playground_movies",
    "fields": {
      "title": "string",
      "genres": "array",
      "release_year": "number",
      "director": "string",
      "rating": "number"
    }
  },
  "music": {
    "tableName": "playground_music",
    "fields": {
      "title": "string",
      "artist": "string",
      "album": "string",
      "genre": "string",
      "duration_seconds": "number"
    }
  },
  "games": {
    "tableName": "playground_games",
    "fields": {
      "title": "string",
      "platforms": "array",
      "genre": "string",
      "release_date": "string",
      "age_rating": "string"
    }
  },
  "news": {
    "tableName": "playground_news",
    "fields": {
      "headline": "string",
      "author": "string",
      "category": "string",
      "published_at": "string",
      "tags": "array"
    }
  },
  "podcasts": {
    "tableName": "playground_podcasts",
    "fields": {
      "show": "string",
      "episode": "string",
      "host": "string",
      "duration_seconds": "number",
      "released_at": "string"
    }
  },
  "todos": {
    "tableName": "playground_todos",
    "fields": {
      "title": "string",
      "priority": "string",
      "completed": "boolean",
      "due_date": "string"
    }
  },
  "snippets": {
    "tableName": "playground_snippets",
    "fields": {
      "title": "string",
      "language": "string",
      "code": "string",
      "tags": "array",
      "description": "string"
    }
  },
  "servers": {
    "tableName": "playground_servers",
    "fields": {
      "name": "string",
      "status": "string",
      "region": "string",
      "cpu_percent": "number",
      "memory_percent": "number"
    }
  },
  "webhooks": {
    "tableName": "playground_webhooks",
    "fields": {
      "url": "string",
      "event": "string",
      "active": "boolean",
      "last_delivery": "object"
    }
  },
  "errors": {
    "tableName": "playground_errors",
    "fields": {
      "error": "string",
      "message": "string",
      "status": "number",
      "path": "string"
    }
  },
  "countries": {
    "tableName": "playground_countries",
    "fields": {
      "name": "string",
      "capital": "string",
      "region": "string",
      "population": "number",
      "currency": "string"
    }
  },
  "space": {
    "tableName": "playground_space",
    "fields": {
      "name": "string",
      "type": "string",
      "orbit_days": "number",
      "radius_earths": "number",
      "moons": "array"
    }
  },
  "weather-records": {
    "tableName": "playground_weather_records",
    "fields": {
      "city": "string",
      "observed_at": "string",
      "temperature_c": "number",
      "humidity_percent": "number",
      "condition": "string"
    }
  },
  "statistics": {
    "tableName": "playground_statistics",
    "fields": {
      "dataset": "string",
      "count": "number",
      "average": "number",
      "distribution": "object"
    }
  },
  "locations": {
    "tableName": "playground_locations",
    "fields": {
      "name": "string",
      "category": "string",
      "address": "string",
      "latitude": "number",
      "longitude": "number"
    }
  },
  "auth": {
    "tableName": "playground_auth",
    "fields": {
      "access_token": "string",
      "token_type": "string",
      "expires_in": "number",
      "user": "object"
    }
  },
  "request-tests": {
    "tableName": "playground_request_tests",
    "fields": {
      "scenario": "string",
      "status": "number",
      "content_type": "string",
      "received_headers": "object",
      "message": "string"
    }
  }
};
