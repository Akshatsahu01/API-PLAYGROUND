import pool from "../config/db.js";

async function getAllFakeApis() {
  const query = `
    SELECT
      id,
      name,
      short_desc,
      base_url,
      category,
      tags,
      docs_url
    FROM fake_apis
    ORDER BY id ASC
  `;
  const result = await pool.query(query);
  return result.rows;
}

async function getFakeApiById(id) {
  const query = `
    SELECT
      id,
      name,
      short_desc,
      description,
      base_url,
      category,
      sample_response,
      usage_snippet,
      tags,
      docs_url
    FROM fake_apis
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

export default {
  getAllFakeApis,
  getFakeApiById,
};

