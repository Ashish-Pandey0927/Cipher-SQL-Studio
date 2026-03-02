module.exports = function validateQuery(req, res, next) {
  const { userQuery } = req.body;

  if (!userQuery || !userQuery.trim()) {
    return res.status(400).json({
      success: false,
      error: "Query cannot be empty."
    });
  }

  // Only allow SELECT
  const trimmed = userQuery.trim().toLowerCase();

  if (!trimmed.startsWith("select")) {
    return res.status(400).json({
      success: false,
      error: "Only SELECT queries are allowed."
    });
  }

  // Block dangerous keywords
  const forbidden = ["drop", "delete", "update", "insert", "alter", "truncate"];

  for (let word of forbidden) {
    if (trimmed.includes(word)) {
      return res.status(400).json({
        success: false,
        error: "Dangerous query detected."
      });
    }
  }

  next();
};