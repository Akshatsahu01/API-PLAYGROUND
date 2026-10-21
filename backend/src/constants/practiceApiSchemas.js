// Generated from frontend/src/data/fakeApis.js.
export const practiceApiSchemas = {
  "students": {
    "name": "string",
    "email": "string",
    "course_id": "number",
    "semester": "number",
    "enrollment_status": "string"
  },
  "courses": {
    "title": "string",
    "description": "string",
    "credits": "number",
    "prerequisites": "array",
    "instructor": "string"
  },
  "exams": {
    "course_id": "number",
    "subject": "string",
    "scheduled_at": "string",
    "total_marks": "number",
    "status": "string"
  },
  "grades": {
    "student_id": "number",
    "course_id": "number",
    "marks": "number",
    "grade": "string",
    "cgpa": "number",
    "result": "string"
  },
  "library": {
    "title": "string",
    "type": "string",
    "author": "string",
    "available": "boolean",
    "due_date": "any"
  },
  "employees": {
    "name": "string",
    "email": "string",
    "department": "string",
    "job_title": "string",
    "joined_at": "string"
  },
  "companies": {
    "name": "string",
    "website": "string",
    "industry": "string",
    "size": "string",
    "location": "string"
  },
  "teams": {
    "name": "string",
    "leader_id": "number",
    "member_ids": "array",
    "project_ids": "array",
    "created_at": "string"
  },
  "jobs": {
    "title": "string",
    "company_id": "number",
    "skills": "array",
    "salary_min": "number",
    "salary_max": "number",
    "location": "string",
    "employment_type": "string"
  },
  "applications": {
    "job_id": "number",
    "applicant_id": "number",
    "status": "string",
    "applied_at": "string",
    "notes": "string"
  },
  "comments": {
    "user_id": "number",
    "resource_type": "string",
    "resource_id": "number",
    "body": "string",
    "created_at": "string"
  },
  "users": {
    "username": "string",
    "name": "string",
    "bio": "string",
    "avatar_url": "string",
    "settings": "object"
  },
  "followers": {
    "follower_id": "number",
    "following_id": "number",
    "created_at": "string"
  },
  "notifications": {
    "user_id": "number",
    "type": "string",
    "message": "string",
    "read": "boolean",
    "created_at": "string"
  },
  "chats": {
    "conversation_id": "number",
    "sender_id": "number",
    "message": "string",
    "sent_at": "string"
  },
  "expenses": {
    "title": "string",
    "category": "string",
    "amount": "number",
    "currency": "string",
    "spent_at": "string",
    "description": "string"
  },
  "cart": {
    "user_id": "number",
    "items": "array",
    "total": "number"
  },
  "orders": {
    "customer_id": "number",
    "items": "array",
    "total": "number",
    "status": "string",
    "shipping_address": "object"
  },
  "invoices": {
    "customer_id": "number",
    "due_date": "string",
    "line_items": "array",
    "subtotal": "number",
    "tax": "number",
    "total": "number",
    "status": "string"
  },
  "coupons": {
    "code": "string",
    "discount_percent": "number",
    "expires_at": "string",
    "minimum_order": "number",
    "usage_limit": "number",
    "active": "boolean"
  },
  "flights": {
    "flight_number": "string",
    "origin": "string",
    "destination": "string",
    "departure_at": "string",
    "seats_available": "number",
    "status": "string"
  },
  "hotels": {
    "name": "string",
    "city": "string",
    "rating": "number",
    "price_per_night": "number",
    "amenities": "array"
  },
  "destinations": {
    "name": "string",
    "country": "string",
    "description": "string",
    "estimated_budget": "number",
    "attractions": "array"
  },
  "bus-routes": {
    "route_number": "string",
    "stops": "array",
    "departure_at": "string",
    "fare": "number",
    "duration_minutes": "number"
  },
  "properties": {
    "title": "string",
    "city": "string",
    "monthly_rent": "number",
    "bedrooms": "number",
    "amenities": "array"
  },
  "recipes": {
    "title": "string",
    "ingredients": "array",
    "steps": "array",
    "cooking_minutes": "number",
    "dietary_tags": "array"
  },
  "workouts": {
    "name": "string",
    "exercises": "array",
    "duration_minutes": "number"
  },
  "habits": {
    "name": "string",
    "completed_dates": "array",
    "current_streak": "number",
    "target_per_week": "number"
  },
  "sleep-records": {
    "user_id": "number",
    "slept_at": "string",
    "woke_at": "string",
    "duration_hours": "number",
    "quality": "string"
  },
  "moods": {
    "user_id": "number",
    "mood": "string",
    "note": "string",
    "recorded_at": "string"
  },
  "movies": {
    "title": "string",
    "genres": "array",
    "release_year": "number",
    "director": "string",
    "rating": "number"
  },
  "music": {
    "title": "string",
    "artist": "string",
    "album": "string",
    "genre": "string",
    "duration_seconds": "number"
  },
  "games": {
    "title": "string",
    "platforms": "array",
    "genre": "string",
    "release_date": "string",
    "age_rating": "string"
  },
  "news": {
    "headline": "string",
    "author": "string",
    "category": "string",
    "published_at": "string",
    "tags": "array"
  },
  "podcasts": {
    "show": "string",
    "episode": "string",
    "host": "string",
    "duration_seconds": "number",
    "released_at": "string"
  },
  "todos": {
    "title": "string",
    "priority": "string",
    "completed": "boolean",
    "due_date": "string"
  },
  "snippets": {
    "title": "string",
    "language": "string",
    "code": "string",
    "tags": "array",
    "description": "string"
  },
  "servers": {
    "name": "string",
    "status": "string",
    "region": "string",
    "cpu_percent": "number",
    "memory_percent": "number"
  },
  "webhooks": {
    "url": "string",
    "event": "string",
    "active": "boolean",
    "last_delivery": "object"
  },
  "errors": {
    "error": "string",
    "message": "string",
    "status": "number",
    "path": "string"
  },
  "countries": {
    "name": "string",
    "capital": "string",
    "region": "string",
    "population": "number",
    "currency": "string"
  },
  "space": {
    "name": "string",
    "type": "string",
    "orbit_days": "number",
    "radius_earths": "number",
    "moons": "array"
  },
  "weather-records": {
    "city": "string",
    "observed_at": "string",
    "temperature_c": "number",
    "humidity_percent": "number",
    "condition": "string"
  },
  "statistics": {
    "dataset": "string",
    "count": "number",
    "average": "number",
    "distribution": "object"
  },
  "locations": {
    "name": "string",
    "category": "string",
    "address": "string",
    "latitude": "number",
    "longitude": "number"
  },
  "auth": {
    "access_token": "string",
    "token_type": "string",
    "expires_in": "number",
    "user": "object",
    "name": "string",
    "email": "string",
    "password": "string"
  },
  "request-tests": {
    "scenario": "string",
    "status": "number",
    "content_type": "string",
    "received_headers": "object",
    "message": "string"
  }
};
