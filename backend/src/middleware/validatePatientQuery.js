const allowedQueryParameters = new Set([
  "gender",
  "age",
  "doctorAssigned",
  "amountToBePaid",
  "sickness",
]);

function validatePatientQuery(req, res, next) {
  const invalidParameter = Object.keys(req.query).find(
    (parameter) => !allowedQueryParameters.has(parameter),
  );

  if (invalidParameter) {
    return res.status(400).json({
      message: `Unsupported query parameter: ${invalidParameter}`,
    });
  }

  if (req.query.doctorAssigned !== undefined) {
    const doctorAssigned = Number(req.query.doctorAssigned);

    if (!Number.isInteger(doctorAssigned) || doctorAssigned < 1) {
      return res.status(400).json({
        message: "doctorAssigned must be a positive integer",
      });
    }
  }

  next();
}

export default validatePatientQuery;
