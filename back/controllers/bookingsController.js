const { Booking, BookingLocation, Location } = require("../models");

const index = (req, res) => {
  return Booking.findAll()
    .then((bookings) => res.status(200).send(bookings))
    .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
  const newBooking = req.body.booking;
  return Booking.create(newBooking)
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

const getBookingsByAgent = async (req, res) => {
  const id = req.params.id;

  try {
    const bookings = await Booking.findAll({
      where: { userID: id },
      attributes: ["id", "date", "status"],
      include: [
        {
          model: BookingLocation,
          //attributes: ["locationID"],
          include: [
            {
              model: Location,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (!bookings) {
      return res.status(404).json({ msg: "Bookings Not Found" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
  getBookingsByAgent,
};
