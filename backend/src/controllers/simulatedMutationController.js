function respondToValidatedMutation(req, res) {
  const { resource, method } = req.validatedMutation;
  const resourceLabel = resource === "doctors" ? "doctor" : "patient";
  const isDelete = method === "DELETE";
  const data = isDelete
    ? {
        filters: req.validatedMutation.filters,
        affectedCount: 0,
      }
    : req.body;
  const message = isDelete
    ? `The ${resourceLabel} deletion request passed validation.`
    : `The ${resourceLabel} ${method} request passed validation.`;

  return res.status(200).json({
    success: true,
    message,
    data,

  });
}

export default respondToValidatedMutation;
