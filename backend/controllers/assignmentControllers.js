const Assignment = require("../models/Assignment");

const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().select("-__v");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: "Error fetching assignment" });
  }
};

module.exports = {
  getAssignments,
  getAssignmentById
};