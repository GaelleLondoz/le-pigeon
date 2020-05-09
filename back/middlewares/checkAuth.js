const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  console.log("INSIDE CHECK AUTH");
  const token = req.headers.authorization;
  console.log({ token: token });
  //const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "You must be logged in" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Acces Denied" });
    req.user = user;
    next();
  });
};

module.exports = checkAuth;
