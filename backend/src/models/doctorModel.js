import pool from "../config/db.js";

async function getAllDoctors(filters) {
  let query = "SELECT * FROM doctors";

  const conditions = [];
  const values = [];

  // Filter: Specialization
  if (filters.specialization) {
    conditions.push(`specialization = $${values.length + 1}`);
    values.push(filters.specialization);
  }

  // Filter: Availability
  if (filters.availability) {
    conditions.push(`available = $${values.length + 1}`);
    values.push(filters.availability === "Available");
  }

  // Filter: Experience
  if (filters.experience) {
    conditions.push(`experience >= $${values.length + 1}`);
    values.push(Number(filters.experience));
  }

  // Add WHERE clause only if filters exist
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  const result = await pool.query(query, values);

  return result.rows;
}

export default {
  getAllDoctors,
};