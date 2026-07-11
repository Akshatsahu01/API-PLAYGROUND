import pool from "../config/db.js";

async function getAllDoctors() {
  const result = await pool.query("SELECT * FROM doctors");
  return result.rows;
}

export default {
  getAllDoctors,
};
