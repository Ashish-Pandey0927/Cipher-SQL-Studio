const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: String,
  schemaDefinition: String,   
  samplePreview: [mongoose.Schema.Types.Mixed] 
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },
  tables: [tableSchema]
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);