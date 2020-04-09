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
                    let token = jwt.sign(payload, process.env.JWT_SECRET);
                    res.status(200).json({ msg: "ok", token: token, user: payload });
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
    console.log(req);
    const headerAuth = req.headers.authorization;
    try {
        let checkStatus = jwt.verify(headerAuth, process.env.JWT_SECRET);
        if (checkStatus != null) {
            res.status(200).json({ msg: "Token is still valid", token: headerAuth, user: checkStatus });
        }
    } catch (e) {
        console.log({ e: e })
        throw e;
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
};