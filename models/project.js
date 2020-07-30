const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  linkedinURL: {
    type: String,
    required: true
  },
  githubURL: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
})

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type:String,
    required: true
  },
  description: {
      type: String,
      // required: true
  },
  applicants: [applicantSchema],
  completed: {
      type: Boolean,
      default: false
  },
  releaseDate: {
      type: Number,
      default: function () {
          return new Date().getFullYear()
      }
  }
}
, {
timestamps: true
})

module.exports = Project = mongoose.model("project", projectSchema);

module.exports = Project = mongoose.model("project", projectSchema);