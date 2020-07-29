const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {type: String, required: true},
  userId: {type:String, required: true}
})

module.exports = Project = mongoose.model("project", projectSchema);