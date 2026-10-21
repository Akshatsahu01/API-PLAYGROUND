import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";

const mockGetAll = jest.fn();
const mockGetById = jest.fn();

jest.unstable_mockModule("../src/models/practiceApiModel.js", () => ({
  default: {
    getAll: mockGetAll,
    getById: mockGetById,
  },
}));

const { default: app } = await import("../src/app.js");

let server;
let baseUrl;

async function makeRequest(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  return {
    status: response.status,
    body: await response.json(),
  };
}

describe("practice API HTTP routes", () => {
  beforeAll(async () => {
    server = app.listen(0, "127.0.0.1");
    await new Promise((resolve, reject) => {
      server.once("listening", resolve);
      server.once("error", reject);
    });
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    }
  });

  beforeEach(() => {
    mockGetAll.mockReset();
    mockGetById.mockReset();
  });

  test("GET collection routes filters and returns database-model records", async () => {
    const records = [{ id: 1, name: "Northstar Labs", industry: "Technology" }];
    mockGetAll.mockResolvedValue(records);

    const result = await makeRequest("/api/companies?industry=Technology&limit=10");

    expect(result.status).toBe(200);
    expect(result.body).toEqual(records);
    expect(mockGetAll).toHaveBeenCalledWith("companies", {
      industry: "Technology",
      limit: "10",
    });
  });

  test("GET by ID routes the API and ID and returns the matching record", async () => {
    const record = { id: 1, name: "Northstar Labs" };
    mockGetById.mockResolvedValue(record);

    const result = await makeRequest("/api/companies/1");

    expect(result.status).toBe(200);
    expect(result.body).toEqual(record);
    expect(mockGetById).toHaveBeenCalledWith("companies", 1);
  });

  test("GET by ID rejects malformed IDs before querying the model", async () => {
    const result = await makeRequest("/api/companies/not-an-id");

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: "ID must be a positive integer." });
    expect(mockGetById).not.toHaveBeenCalled();
  });

  test("PATCH returns simulated success without calling the database model", async () => {
    const result = await makeRequest("/api/companies/1", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Northstar Labs Updated" }),
    });

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      success: true,
      message: "companies updated successfully (simulated).",
      dataChanged: false,
      data: { name: "Northstar Labs Updated", id: 1 },
    });
    expect(mockGetAll).not.toHaveBeenCalled();
    expect(mockGetById).not.toHaveBeenCalled();
  });
});
