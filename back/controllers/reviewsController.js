// create interactions with database (ex: CRUD) for reviews
// actions already define by sequelize
// .findAll(), .findByPk()... = sequelize vocabulary
// send to ???????


const { Review } = require("../models");

const index = (req, res) => {
  return Review.findAll()
    .then(reviews => res.status(200).send(reviews))
    .catch(e => res.status(500).send(e));
};

const create = (req, res) => {
  const newReview = req.body.review;
  return Review.create(newReview)
    .then(review => res.status(200).send(review))
    .catch(e => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return Review.findByPk(id)
    .then(review => res.status(200).send(review))
    .catch(e => res.status(500).send(e));
}

const update = (req, res) => {
    const id = req.params.id;

    Review.update(req.body, {
        where: { id: id }
    })
    .then(review => res.status(200).send(review))
    .catch(e => res.status(500).send(e));

}

const destroy = (req, res) => {
    const id = req.params.id;
  
    Review.destroy({
      where: { id: id }
    })
    .then(review => res.status(200).res.sendStatus(review))
    .catch(e => res.status(500).send(e));
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy
};