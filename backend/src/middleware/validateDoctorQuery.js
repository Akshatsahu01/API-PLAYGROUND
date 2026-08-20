const allowedQueryParameters = new Set([
  "specialization",
  "availability",
  "experience",
]);

function validateDoctorQuery(req, res, next) {
  const invalidParameter = Object.keys(req.query).find(
    (parameter) => !allowedQueryParameters.has(parameter),
  );

  if (invalidParameter) {
    return res.status(400).json({
      message: `Unsupported query parameter: ${invalidParameter}`,
    });
  }

  if (req.query.experience !== undefined) {
    const experience = Number(req.query.experience);

    if (!Number.isFinite(experience) || experience < 0) {
      return res.status(400).json({
        message: "experience must be a non-negative number",
      });
    }
  }

  next();
}

export default validateDoctorQuery;