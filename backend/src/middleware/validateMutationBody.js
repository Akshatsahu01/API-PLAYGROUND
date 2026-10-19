const schemas = {
  doctors: {
    id: "positiveInteger",
    name: "nonEmptyString",
    specialization: "nonEmptyString",
    experience: "nonNegativeNumber",
    available: "boolean",
  },
  patients: {
    id: "positiveInteger",
    name: "nonEmptyString",
    gender: "gender",
    age: "nonNegativeInteger",
    doctor_id: "positiveInteger",
    amount_to_be_paid: "nonNegativeNumber",
    sickness: "nonEmptyString",
  },
};

function validateField(field, value) {
  switch (field) {
    case "positiveInteger":
      return Number.isInteger(value) && value > 0;
    case "nonNegativeInteger":
      return Number.isInteger(value) && value >= 0;
    case "nonNegativeNumber":
      return (
        (typeof value === "number" ||
          (typeof value === "string" && value.trim() !== "")) &&
        Number.isFinite(Number(value)) &&
        Number(value) >= 0
      );
    case "nonEmptyString":
      return typeof value === "string" && value.trim().length > 0;
    case "boolean":
      return typeof value === "boolean";
    case "gender":
      return ["Male", "Female", "Other"].includes(value);
    default:
      return false;
  }
}

function validateMutationBody(resource, method) {
  return (req, res, next) => {
    const schema = schemas[resource];
    const body = req.body;

    if (!body || Array.isArray(body) || typeof body !== "object") {
      return res.status(400).json({
        message: "Request body must be a JSON object.",
      });
    }

    const fields = Object.keys(body);
    const unknownFields = fields.filter((field) => !(field in schema));
    if (unknownFields.length) {
      return res.status(400).json({
        message: `Unknown field${unknownFields.length === 1 ? "" : "s"}: ${unknownFields.join(", ")}.`,
      });
    }

    if (!Object.hasOwn(body, "id") || !validateField("positiveInteger", body.id)) {
      return res.status(400).json({
        message: 'The "id" field must be a positive integer.',
      });
    }

    if (method === "DELETE") {
      if (fields.length !== 1) {
        return res.status(400).json({
          message: "DELETE body must contain only the id field.",
        });
      }
    } else {
      const updateFields = fields.filter((field) => field !== "id");
      if (!updateFields.length) {
        return res.status(400).json({
          message: `${method} body must include at least one field to update besides id.`,
        });
      }

      if (method === "PUT") {
        const missingFields = Object.keys(schema).filter(
          (field) => field !== "id" && !Object.hasOwn(body, field),
        );
        if (missingFields.length) {
          return res.status(400).json({
            message: `PUT requires every field. Missing: ${missingFields.join(", ")}.`,
          });
        }
      }

      const invalidFields = updateFields.filter(
        (field) => !validateField(schema[field], body[field]),
      );
      if (invalidFields.length) {
        return res.status(400).json({
          message: `Invalid value for field${invalidFields.length === 1 ? "" : "s"}: ${invalidFields.join(", ")}.`,
        });
      }
    }

    req.validatedMutation = { resource, method };
    next();
  };
}

export default validateMutationBody;
