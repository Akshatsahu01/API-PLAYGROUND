import pool from "../config/db.js";
import { practiceApiTables } from "../constants/practiceApiTables.js";

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function getAll(apiId, filters = {}) {
  const api = practiceApiTables[apiId];
  const values = [];
  const conditions = [];
  const reservedFilters = ["search", "limit", "offset", "sort", "order"];

  // Only fields listed for this API are used as SQL column names.
  for (const [field, value] of Object.entries(filters)) {
    if (reservedFilters.includes(field)) continue;

    if (field !== "id" && !Object.prototype.hasOwnProperty.call(api.fields, field)) {
      throw badRequest(`Unknown filter field '${field}' for ${apiId}.`);
    }
    if (typeof value !== "string") {
      throw badRequest(`Query parameter '${field}' must have one value.`);
    }

    values.push(value);
    conditions.push(`"${field}"::text = $${values.length}`);
  }

  if (filters.search !== undefined) {
    if (typeof filters.search !== "string") {
      throw badRequest("Query parameter 'search' must have one value.");
    }
    values.push(`%${filters.search}%`);
    conditions.push(`to_jsonb(api_record)::text ILIKE $${values.length}`);
  }

  const limit = filters.limit === undefined ? 100 : Number(filters.limit);
  const offset = filters.offset === undefined ? 0 : Number(filters.offset);
  if (limit < 1 || limit > 100 || !Number.isInteger(limit) || offset < 0 || !Number.isInteger(offset)) {
    throw badRequest("limit must be 1-100 and offset must be zero or greater.");
  }

  const sort = filters.sort || "id";
  if (typeof sort !== "string" || (sort !== "id" && !Object.prototype.hasOwnProperty.call(api.fields, sort))) {
    throw badRequest(`Unknown sort field '${sort}' for ${apiId}.`);
  }

  const order = String(filters.order || "asc").toLowerCase();
  if (order !== "asc" && order !== "desc") {
    throw badRequest("order must be 'asc' or 'desc'.");
  }

  values.push(limit, offset);
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const sql = `
    SELECT to_jsonb(api_record) AS data
    FROM "${api.tableName}" AS api_record
    ${where}
    ORDER BY "${sort}" ${order.toUpperCase()}
    LIMIT $${values.length - 1} OFFSET $${values.length}
  `;

  const result = await pool.query(sql, values);
  return result.rows.map((row) => row.data);
}

async function getById(apiId, id) {
  const api = practiceApiTables[apiId];
  const sql = `
    SELECT to_jsonb(api_record) AS data
    FROM "${api.tableName}" AS api_record
    WHERE "id" = $1
  `;
  const result = await pool.query(sql, [id]);
  return result.rows[0]?.data || null;
}

export default {
  getAll,
  getById,
};
