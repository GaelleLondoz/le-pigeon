const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getHash } = require("../helpers/index");
const { User } = require("../models");

const index = (req, res) => {
  return User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
  const newUser = req.body.user;
  newUser.password = getHash(newUser.password);
  return User.create(newUser)
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
};
console.log("hello");
const findOne = (req, res) => {
  const id = req.params.id;
  return User.findByPk(id)
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
};

const update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
};

const login = async (req, res) => {
  const { email, password } = req.body.login;

  if (email && password) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      console.log(user);

      if (!user) {
        res.status(401).json({ message: "No such user found" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6000000",
          });

          res.json({ msg: "ok", token: token });
        } else {
          res.status(401).json({ msg: "Password is incorrect" });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};

const me = (req, res) => {
  const headerAuth = req.headers.authorization;
  console.log({
    req,
    headerAuth,
    "req.headers.authorization": req.headers.authorization,
    "process.env.JWT_SECRET": process.env.JWT_SECRET,
  });
  try {
    let checkStatus = jwt.verify(headerAuth, process.env.JWT_SECRET);
    if (checkStatus != null) {
      res.status(200).json({
        msg: "Token is still valid",
        token: headerAuth,
        user: checkStatus,
      });
    } else {
      res.status(401).json({
        msg: "Unauthorized",
      });
    }
  } catch (e) {
    throw e;
  }
};

const logout = (req, res) => {
  const headerAuth = req.headers.authorization;
  const verifyOptions = {
    expiresIn: "0",
  };

  const checkStatus = jwt.verify(
    headerAuth,
    process.env.JWT_SECRET,
    verifyOptions
  );
  console.log({ checkStatus });
  if (checkStatus != null) {
    res.status(200).json({});
  } else {
    res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
  login,
  me,
  logout,
};
