const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(404).send("token is not valid");
  jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
    req.userId = user.userId;
    req.isSeller = user.isSeller;
    next();
  });
};

module.exports = verifyToken;
