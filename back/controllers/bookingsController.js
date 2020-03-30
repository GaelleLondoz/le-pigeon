// create interactions with database (ex: CRUD) for bookings
// actions already define by sequelize
// .findAll(), .findByPk()... = sequelize vocabulary
// send to ???????

const { Booking } = require("../models");

const index = (req, res) => {
  return Booking.findAll()
    .then(bookings => res.status(200).send(bookings))
    .catch(e => res.status(500).send(e));
};

const create = (req, res) => {
  const newBooking = req.body.booking;
  return Booking.create(newBooking)
    .then(booking => res.status(200).send(booking))
    .catch(e => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return Booking.findByPk(id)
    .then(booking => res.status(200).send(booking))
    .catch(e => res.status(500).send(e));
}

const update = (req, res) => {
    const id = req.params.id;

    Booking.update(req.body, {
        where: { id: id }
    })
    .then(booking => res.status(200).send(booking))
    .catch(e => res.status(500).send(e));
}

const destroy = (req, res) => {
    const id = req.params.id;
  
    Booking.destroy({
      where: { id: id }
    })
    .then(Booking => res.status(200).send(Booking))
    .catch(e => res.status(500).send(e));
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy
};