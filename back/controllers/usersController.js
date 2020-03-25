const { User } = require("../models/user");

const index = (req, res) => {
  return User.findAll()
    .then(users => res.status(200).send(users))
    .catch(e => res.status(500).send(e));
};

const create = (req, res) => {
  const newUser = req.body.User;
  return User.create(newUser)
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
};

module.exports = {
  index,
  create
};