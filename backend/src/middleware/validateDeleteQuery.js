const supportedFilters = {
  doctors: new Set(["availability", "specialization", "experience"]),
  patients: new Set([
    "gender",
    "age",
    "doctorAssigned",
    "amountToBePaid",
    "sickness",
  ]),
};

function validateDeleteQuery(resource) {
  return (req, res, next) => {
    if (req.body && Object.keys(req.body).length > 0) {
      return res.status(400).json({
        message: "DELETE does not accept a request body. Use URL query filters instead.",
      });
    }

    const filters = supportedFilters[resource];
    const unsupportedFilter = Object.keys(req.query).find(
      (filter) => !filters.has(filter),
    );
    if (unsupportedFilter) {
      return res.status(400).json({
        message: `Unsupported ${resource.slice(0, -1)} filter: ${unsupportedFilter}.`,
      });
    }

    const emptyFilter = Object.keys(req.query).find(
      (filter) => typeof req.query[filter] !== "string" || !req.query[filter].trim(),
    );
    if (emptyFilter) {
      return res.status(400).json({
        message: `Filter ${emptyFilter} must have a value.`,
      });
    }

    if (resource === "doctors") {
      if (
        req.query.availability !== undefined &&
        !["Available", "Unavailable"].includes(req.query.availability)
      ) {
        return res.status(400).json({
          message: "availability must be Available or Unavailable.",
        });
      }
      if (
        req.query.experience !== undefined &&
        (!Number.isFinite(Number(req.query.experience)) || Number(req.query.experience) < 0)
      ) {
        return res.status(400).json({
          message: "experience must be a non-negative number.",
        });
      }
    }

    if (resource === "patients") {
      if (
        req.query.gender !== undefined &&
        !["Male", "Female", "Other"].includes(req.query.gender)
      ) {
        return res.status(400).json({
          message: "gender must be Male, Female, or Other.",
        });
      }
      if (
        req.query.age !== undefined &&
        !["0-18", "19-30", "31-50", "50+"].includes(req.query.age)
      ) {
        return res.status(400).json({
          message: "age must be 0-18, 19-30, 31-50, or 50+.",
        });
      }
      if (
        req.query.doctorAssigned !== undefined &&
        (!Number.isInteger(Number(req.query.doctorAssigned)) || Number(req.query.doctorAssigned) < 1)
      ) {
        return res.status(400).json({
          message: "doctorAssigned must be a positive integer.",
        });
      }
    }

    req.validatedMutation = {
      resource,
      method: "DELETE",
      filters: req.query,
    };
    next();
  };
}

export default validateDeleteQuery;
