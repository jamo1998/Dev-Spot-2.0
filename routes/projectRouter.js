const router = require("express").Router();
const auth = require('../middleware/auth');
const Project = require('../models/project');

router.post("/new", auth, async (req, res) => {
  try {
    const { title } = req.body;

    // validation
    if (!title) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const newProject = new Project({
      title,
      userId: req.user
    });
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/all', auth, async (req, res) => {
  const projects = await Project.find({
    userId: req.user
  })
  res.json(projects)
})

router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findOne({userId: req.user, _id: req.params.id});
  if (!project){
    return res.status(400).json({ msg: 'No project found with this ID that belongs to the current user.'})
  }
  const deletedProject = await Project.findByIdAndDelete(req.params.id);
  res.json(deletedProject)
})

module.exports = router;