const router = require("express").Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');


router.post("/register", async (req, res) => {
  try {
    let {
      email,
      password,
      passwordCheck,
      username,
      bio,
      githubURL,
      linkedinURL,
      portfolioURL,
    } = req.body;

    // validate
    // make sure all required fields are inputted
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    // check password length
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 5 characters" });
    }

    // check to see if passwords match
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Passwords must match" });
    }

    // check to see if user exists
    const existingUser = await User.findOne({email: email})
    if (existingUser) {
      return res.status(400).json({ msg: "This email already exists" });
    }

    // check to see if username field has been entered, if not, set the username to the email
    if (!username) {
      username = email;
    }

    // gen salt
    const salt = await bcrypt.genSalt();
    // hash the password
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(passwordHash)

    // Save the user
    const newUser = new User({
      email,
      password: passwordHash,
      username,
      bio,
      githubURL,
      linkedinURL,
      portfolioURL,
    })

    const savedUser = await newUser.save()
    res.json(savedUser);
    
  } catch (err) {
    res.status(500).json({err: err.message});
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password} = req.body

    // validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    // find user in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "No account with this email has been registered" });
    }

    // compare pass form the req to see if it matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If isMatch is false, credentials must be incorrect
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        bio: user.bio,
        githubURL: user.githubURL,
        linkedinURL: user.linkedinURL,
        portfolioURL: user.portfolioURL
      }
    });
  } catch (err) {
    res.status.json({ error: err.message })
  }
})

router.delete('/delete', auth, async (req ,res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user)
    res.json(deletedUser)
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
})

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if(!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(!verified) {
      return res.json(false)
    }
    
    const user = await User.findById(verified.id)
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'jwt malformed') {
      return res.json(false)
    }
    res.status(500).json({ error: err.message})
  }
});


router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    bio: user.bio,
    githubURL: user.githubURL,
    linkedinURL: user.linkedinURL,
    portfolioURL: user.portfolioURL,
    id: user._id
  })
})

module.exports = router;
