const { Booking } = require("../models");

const index = (req, res) => {
  return Booking.findAll()
    .then((bookings) => res.status(200).send(bookings))
    .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
  const id = req.params.id;
  const newBooking = req.body.booking;
  console.log(req.body.booking.date);
  return Booking.create({
    userID: req.user.id,
    agentID: 1, // ID de l'agent doit figurer dans l'URL côté FRONT,
    status: "Le test est concluant",
    message: "req.body.message",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    //Viens de formulaire
    date: req.body.booking.date,
    type: "Face à Face au Pigeon",
  })
    .then((booking) => res.status(200).send(booking))
    .catch((e) => res.status(500).send(e));
};

const findOne = (req, res) => {
  const id = req.params.id;
  return Booking.findByPk(id)
    .then((booking) => res.status(200).send(booking))
    .catch((e) => res.status(500).send(e));
};

const update = (req, res) => {
  const id = req.params.id;

  Booking.update(req.body, {
    where: { id: id },
  })
    .then((booking) => res.status(200).send(booking))
    .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
  const id = req.params.id;

  Booking.destroy({
    where: { id: id },
  })
    .then((Booking) => res.status(200).send(Booking))
    .catch((e) => res.status(500).send(e));
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
};
