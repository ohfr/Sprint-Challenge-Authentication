const router = require('express').Router();
const { verifyToken, generateToken, validateBody } = require("./authenticate-middleware");
const bcrypt = require("bcryptjs");
const db = require("./auth-model");

router.post('/register',validateBody(), async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 12);
    res.status(201).json(await db.add(req.body))
  } catch(err) {
    next(err);
  }
});

router.post('/login', validateBody(), async (req, res, next) => {
  try {
    const {username , password } = req.body;
    
    const user = await db.findBy({ username });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (user && validPassword) {
      const token = generateToken(user);
      res.json({ message: "You are logged in", token});
    } else {
      res.status(401).json({message: "Invalid Credentials"});
    }
  } catch(err) {
    next(err);
  }
});


module.exports = router;
