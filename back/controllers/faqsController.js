const sequelize = require("sequelize");
const { Faq } = require("../models");

const index = (req, res) => {
    return Faq.findAll()
        .then((faqs) => res.status(200).send(faqs))
        .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
    const newFaq = req.body.faq;
    return Faq.create(newFaq)
        .then((faq) => {
            res.status(200).send(faq);
        })
        .catch((e) => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return Faq.findByPk(id)
        .then((faq) => res.status(200).send(faq))
        .catch((e) => res.status(500).send(e));
};

const findAllFaqsFeatured = async(req, res) => {
    try {
        const faqsFeatured = await Faq.findAll({
            where: { featured: true },
        });

        return res.status(200).json(faqsFeatured);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};

const findAllFaqsAgents = async(req, res) => {
    try {
        const faqsAgents = await Faq.findAll({
            where: { categoryID: 1 },
        });
        return res.status(200).json(faqsAgents);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};

const findAllFaqsFuturTravellers = async(req, res) => {
    try {
        const faqsFuturTravellers = await Faq.findAll({
            where: { categoryID: 2 },
        });
        return res.status(200).json(faqsFuturTravellers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};

const findAllFaqsOthers = async(req, res) => {
    try {
        const faqsOthers = await Faq.findAll({
            where: { categoryID: 3 },
        });
        return res.status(200).json(faqsOthers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};

const update = (req, res) => {
    const id = req.params.id;
    Faq.update(req.body, {
            where: { id: id },
        })
        .then((faq) => res.status(200).send(faq))
        .catch((e) => res.status(500).send(e));

    Faq.update(req.body, {
            where: { id: id },
        })
        .then((faq) => res.status(200).send(faq))
        .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
    const id = req.params.id;
    Faq.destroy({
            where: { id: id },
        })
        .then(() => res.status(200).json({ message: "faq deleted" }))
        .catch((e) => res.status(500).send(e));
};

module.exports = {
    index,
    create,
    findOne,
    update,
    destroy,
    findAllFaqsFeatured,
    findAllFaqsAgents,
    findAllFaqsFuturTravellers,
    findAllFaqsOthers,
};