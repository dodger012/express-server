const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
