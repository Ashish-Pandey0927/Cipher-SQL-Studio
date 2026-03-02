const express = require("express");
const router = express.Router();
const { executeQuery } = require("../controllers/executionController");
const validateQuery = require("../middleware/validateQuery");

router.post("/", validateQuery, executeQuery);

module.exports = router;