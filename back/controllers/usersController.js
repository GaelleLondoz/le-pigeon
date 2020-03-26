const { User } = require("../models");

const index = (req, res) => {
  return User.findAll()
    .then(users => res.status(200).send(users))
    .catch(e => res.status(500).send(e));
};

const create = (req, res) => {
  const newUser = req.body.user;
  return User.create(newUser)
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return User.findByPk(id)
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
}

const update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));

}

const destroy = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy
};