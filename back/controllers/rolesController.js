const { Role } = require("../models");

const index = async(req, res) => {
    return Role.findAll()
        .then((roles) => res.status(200).send(roles))
        .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
    const newRole = req.body.role;
    return Role.create(newRole)
        .then((role) => res.status(200).send(role))
        .catch((e) => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return Role.findByPk(id)
        .then((role) => res.status(200).send(role))
        .catch((e) => res.status(500).send(e));
};

const update = (req, res) => {
    const id = req.params.id;

    Role.update(req.body, {
            where: { id: id },
        })
        .then((role) => res.status(200).send(role))
        .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
    const id = req.params.id;

    Role.destroy({
            where: { id: id },
        })
        .then((Role) => res.status(200).send(Role))
        .catch((e) => res.status(500).send(e));
};


module.exports = {
    index,
    create,
    findOne,
    update,
    destroy,
};