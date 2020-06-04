const { Message, User } = require("../models");

const index = (req, res) => {
    return Message.findAll()
        .then((messages) => res.status(200).send(messages))
        .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
    const newMessage = req.body.message;
    return Message.create(newMessage)
        .then((message) => res.status(200).send(message))
        .catch((e) => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return Message.findByPk(id)
        .then((message) => res.status(200).send(message))
        .catch((e) => res.status(500).send(e));
};

const update = (req, res) => {
    const id = req.params.id;
    const statusData = {
        status: req.params.status,
    };

    Message.update(statusData, {
            where: { id: id },
        })
        .then((message) => res.status(200).send(message))
        .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
    const id = req.params.id;

    Message.destroy({
            where: { id: id },
        })
        .then((message) => res.status(200).res.sendStatus(message))
        .catch((e) => res.status(500).send(e));
};

const findMessages = (req, res) => {
    const receiverID = req.params.receiverID;
    return Message.findAll({
            where: { receiverID: receiverID, status: "SEND" },
        })
        .then((messages) => res.status(200).send(messages))
        .catch((e) => res.status(500).send(e));
};

const getAllMessagesByUser = async(req, res) => {
    const id = req.params.id;
    try {
        const messages = await Message.findAll({
            where: { receiverID: id },
            include: [{
                model: User,
                as: "sender",
            }, ],
        });
        if (!messages) {
            return res.status(404).json({ msg: "Messages Not Found" });
        }
        return res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};

const changeStatusMessage = async(req, res) => {
    const id = req.params.id;
    try {
        await Message.update({
            status: req.body.status,
        }, { where: { id: id } });
        return res.status(200).json({ msg: "Message Status Updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};

module.exports = {
    index,
    create,
    findOne,
    update,
    destroy,
    getAllMessagesByUser,
    changeStatusMessage,
    findMessages,
};