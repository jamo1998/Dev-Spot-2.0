const router = require("express").Router();
const auth = require('../middleware/auth');
const Project = require('../models/project');

router.post("/new", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    // validation
    if (!title) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const newProject = new Project({
      title,
      description,
      userId: req.user
    });
    const savedProject = await newProject.save();
    res.json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all projects for a single user
router.get('/all', auth, async (req, res) => {
  const projects = await Project.find({
    userId: req.user
  })
  res.json(projects)
})

// Delete a project by ID
router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findOne({userId: req.user, _id: req.params.id});
  if (!project){
    return res.status(400).json({ msg: 'No project found with this ID that belongs to the current user.'})
  }
  const deletedProject = await Project.findByIdAndDelete(req.params.id);
  res.json(deletedProject)
})

// Get project details for user
router.get('/:id', auth, async (req, res) => {
  const project = await Project.findOne({ userId: req.user, _id: req.params.id});
  res.json(project);
})

// Get all projects for every user
router.get('/', async (req, res) => {
  const projects = await Project.find({});
  if (!projects) {
    return res.status(400).json({ msg: 'No project found with this ID that belongs to the current user.'})
  }
  res.json(projects);
})

router.put('/:id', async (req, res) => {
  try {
    const project = await Project.update(
      { _id: req.params.id }, 
      { $push: { applicants: req.body } }
  );
    res.json(project);
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'Could not update the project'})
  }
  
})


module.exports = router;