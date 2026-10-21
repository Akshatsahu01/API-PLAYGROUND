import practiceApiServices from "../services/practiceApiServices.js";
import { practiceApiSchemas } from "../constants/practiceApiSchemas.js";

function isValidId(id) {
  return /^[1-9]\d*$/.test(id);
}

function recordExists(id) {
  return Number(id) >= 1 && Number(id) <= 10;
}

function getBodyError(body, apiId, id, requireAllFields = false, allowEmpty = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body is invalid. Send a JSON object.";
  }

  if (id && body.id !== undefined && String(body.id) !== String(id)) {
    return "Request body ID must match the ID in the URL.";
  }

  const fields = Object.keys(body).filter((field) => field !== "id");
  if (!allowEmpty && fields.length === 0) {
    return "Request body is invalid. Include at least one field.";
  }

  const schema = practiceApiSchemas[apiId];
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(schema, field)) {
      return `Unknown field: ${field}.`;
    }

    const expectedType = schema[field];
    const value = body[field];
    if (expectedType === "any" || value === null) continue;
    if (expectedType === "array" && !Array.isArray(value)) return `${field} must be an array.`;
    if (expectedType === "object" && (typeof value !== "object" || Array.isArray(value))) {
      return `${field} must be an object.`;
    }
    if (!["array", "object"].includes(expectedType) && typeof value !== expectedType) {
      return `${field} must be a ${expectedType}.`;
    }
  }

  if (requireAllFields) {
    for (const field of Object.keys(schema)) {
      if (!Object.prototype.hasOwnProperty.call(body, field)) {
        return `Request body is missing the ${field} field.`;
      }
    }
  }

  return null;
}

async function getAllPracticeApis(req, res) {
  try {
    const records = await practiceApiServices.getAllPracticeApis(req.apiId, req.query);
    res.status(200).json(records);
  } catch (error) {
    console.error(`Error fetching ${req.apiId}:`, error);
    res.status(error.status || 500).json({ message: error.message || `Failed to fetch ${req.apiId}.` });
  }
}

async function getPracticeApiById(req, res) {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: "ID must be a positive integer." });
  }

  try {
    const record = await practiceApiServices.getPracticeApiById(req.apiId, Number(req.params.id));
    if (!record) return res.status(404).json({ message: `${req.apiId} record not found.` });
    return res.status(200).json(record);
  } catch (error) {
    console.error(`Error fetching ${req.apiId}:`, error);
    return res.status(500).json({ message: `Failed to fetch ${req.apiId}.` });
  }
}

function createPracticeApi(req, res) {
  const bodyError = getBodyError(req.body, req.apiId);
  if (bodyError) return res.status(400).json({ success: false, message: bodyError });

  return res.status(200).json({
    success: true,
    message: `${req.apiId} created successfully (simulated).`,
    dataChanged: false,
    data: req.body,
  });
}

function updatePracticeApi(req, res, requireAllFields) {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "ID must be a positive integer." });
  }

  const bodyError = getBodyError(
    req.body,
    req.apiId,
    req.params.id,
    requireAllFields,
  );
  if (bodyError) return res.status(400).json({ success: false, message: bodyError });
  if (!recordExists(req.params.id)) {
    return res.status(404).json({ success: false, message: `${req.apiId} record not found.` });
  }

  return res.status(200).json({
    success: true,
    message: `${req.apiId} updated successfully (simulated).`,
    dataChanged: false,
    data: { ...req.body, id: Number(req.params.id) },
  });
}

function putPracticeApi(req, res) {
  return updatePracticeApi(req, res, req.apiId !== "auth");
}

function patchPracticeApi(req, res) {
  return updatePracticeApi(req, res, false);
}

function deletePracticeApi(req, res) {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ success: false, message: "ID must be a positive integer." });
  }

  if (req.body !== undefined) {
    const bodyError = getBodyError(req.body, req.apiId, req.params.id, false, true);
    if (bodyError) return res.status(400).json({ success: false, message: bodyError });
  }
  if (!recordExists(req.params.id)) {
    return res.status(404).json({ success: false, message: `${req.apiId} record not found.` });
  }

  return res.status(200).json({
    success: true,
    message: `${req.apiId} deleted successfully (simulated).`,
    dataChanged: false,
    id: Number(req.params.id),
  });
}

function getSimulatedError(req, res) {
  const messages = {
    400: "The request was invalid.",
    401: "Authentication is required.",
    403: "You do not have permission to access this resource.",
    404: "The requested sample resource was not found.",
    429: "Too many requests. Try again later.",
    500: "An unexpected server error occurred.",
  };
  const status = Number(req.params.status);
  if (!messages[status]) {
    return res.status(400).json({ message: "Use status 400, 401, 403, 404, 429, or 500." });
  }
  return res.status(status).json({ error: messages[status], status, path: req.originalUrl });
}

async function getChatMessages(req, res) {
  if (!isValidId(req.params.id)) return res.status(400).json({ message: "ID must be a positive integer." });
  try {
    const chat = await practiceApiServices.getPracticeApiById("chats", Number(req.params.id));
    if (!chat) return res.status(404).json({ message: "Chat not found." });
    return res.status(200).json({
      conversation_id: chat.conversation_id,
      messages: [{ sender_id: chat.sender_id, message: chat.message, sent_at: chat.sent_at }],
    });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return res.status(500).json({ message: "Failed to fetch chat messages." });
  }
}

function createChatMessage(req, res) {
  if (!isValidId(req.params.id)) return res.status(400).json({ message: "ID must be a positive integer." });
  const bodyError = getBodyError(req.body, "chats");
  if (bodyError) return res.status(400).json({ success: false, message: bodyError });
  if (!recordExists(req.params.id)) return res.status(404).json({ message: "Chat not found." });
  if (typeof req.body.message !== "string" || !req.body.message.trim()) {
    return res.status(400).json({ message: "message must be a non-empty string." });
  }
  return res.status(200).json({
    success: true,
    message: "Message sent successfully (simulated).",
    dataChanged: false,
    data: req.body,
  });
}

async function getWebhookDeliveries(req, res) {
  if (!isValidId(req.params.id)) return res.status(400).json({ message: "ID must be a positive integer." });
  try {
    const webhook = await practiceApiServices.getPracticeApiById("webhooks", Number(req.params.id));
    if (!webhook) return res.status(404).json({ message: "Webhook not found." });
    return res.status(200).json(webhook.last_delivery ? [webhook.last_delivery] : []);
  } catch (error) {
    console.error("Error fetching webhook deliveries:", error);
    return res.status(500).json({ message: "Failed to fetch webhook deliveries." });
  }
}

function authRequest(req, res) {
  const isLogin = req.path.endsWith("/login");
  const requiredFields = isLogin ? ["username", "password"] : ["name", "email", "password"];
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Request body is invalid. Send a JSON object." });
  }
  for (const field of requiredFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return res.status(400).json({ message: `Request body is missing ${field}.` });
    }
  }
  return res.status(200).json({
    success: true,
    message: isLogin ? "Login successful (simulated)." : "Registration successful (simulated).",
    dataChanged: false,
    access_token: "sample-token-abc123",
    token_type: "Bearer",
    expires_in: 3600,
  });
}

export default {
  getAllPracticeApis,
  getPracticeApiById,
  createPracticeApi,
  putPracticeApi,
  patchPracticeApi,
  deletePracticeApi,
  getSimulatedError,
  getChatMessages,
  createChatMessage,
  getWebhookDeliveries,
  authRequest,
};
