const { Message, User } = require("../models");

const index = (req, res) => {
  return Message.findAll()
    .then(messages => res.status(200).send(messages))
    .catch(e => res.status(500).send(e));
};

const create = (req, res) => {
  const newMessage = req.body.message;
  return Message.create(newMessage)
    .then(message => res.status(200).send(message))
    .catch(e => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return Message.findByPk(id)
    .then(message => res.status(200).send(message))
    .catch(e => res.status(500).send(e));
}

const update = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, {
        where: { id: id }
    })
    .then(message => res.status(200).send(message))
    .catch(e => res.status(500).send(e));

}

const destroy = (req, res) => {
    const id = req.params.id;
  
    Message.destroy({
      where: { id: id }
    })
    .then(message => res.status(200).res.sendStatus(message))
    .catch(e => res.status(500).send(e));
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy
};