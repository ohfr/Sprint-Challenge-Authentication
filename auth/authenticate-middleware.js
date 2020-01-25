/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../Secrets/index");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secrets.jwtSecret);
    req.decoded = decoded.subject;
    next();
  } catch(err) {
    next(err);
    return res.status(401).json({ you: 'shall not pass!' });
  }
};

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
};

const validateBody = () => {
  return async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: "Missing credentials"});
    }
    next();
  }
}

module.exports = {
  verifyToken,
  generateToken,
  validateBody
};
