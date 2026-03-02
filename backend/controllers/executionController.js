const pool = require("../config/postgres");

const executeQuery = async (req, res) => {
  const { userQuery } = req.body;

  try {
    const result = await pool.query(userQuery);

    res.json({
      success: true,
      rows: result.rows,
      rowCount: result.rowCount
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { executeQuery };