const { Booking, BookingLocation, Location, User } = require("../models");
const sequelize = require("sequelize");
const db = require("../models/index");
const {
  compareCurrentDate,
  compareDateForUpdateBooking,
} = require("../helpers");

const index = async (req, res) => {
  /*     return Booking.findAll()
                .then((bookings) => res.status(200).send(bookings))
                .catch((e) => res.status(500).send(e)); */

  try {
    const bookings = await db.sequelize.query(
      "SELECT Bookings.id,Bookings.date,Bookings.status,Users.firstName,Users.lastName FROM Bookings JOIN Users ON Users.id = Bookings.userID OR Users.id = Bookings.agentID",
      { type: sequelize.QueryTypes.SELECT }
    );
    if (!bookings) {
      return res.status(403).json({ msg: "Bookings Not Found" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const create = async (req, res) => {
  const newBooking = req.body.booking;
  const userID = req.user.id;
  const agentID = parseInt(req.params.id);
  console.log({ newBooking });
  console.log({ userID });
  console.log({ agentID });
  const errors = [];
  if (newBooking.date === "" || newBooking.date === undefined) {
    errors.push({
      target: "date",
      msg: "Veuillez séléctionner une date pour votre réservation !",
    });
  } else if (!compareCurrentDate(newBooking.date)) {
    errors.push({
      target: "date",
      msg:
        "La date de la réservation doit être supérieure à la date d'aujourd'hui !",
    });
  }
  if (newBooking.type === "" || newBooking.type === undefined) {
    errors.push({
      target: "type",
      msg: "Veuillez séléctionner un type de réservation !",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  if (parseInt(userID) === agentID) {
    return res
      .status(500)
      .json({ msg: "Impossible to book an appointment with yourself" });
  }
  try {
    Booking.create({
      date: newBooking.date,
      type: newBooking.type,
      comment: newBooking.comment,
      userID,
      agentID,
    });
    return res.status(200).json({ msg: "Booking created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
  // return Booking.create(newBooking)
  //   .then((booking) => res.status(200).send(booking))
  //   .catch((e) => res.status(500).send(e));
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
    .then((Booking) => res.sendStatus(200).send(Booking))
    .catch((e) => res.sendStatus(500).send(e));
};

const getBookingsByAgent = async (req, res) => {
  const id = req.params.id;

  try {
    const bookings = await Booking.findAll({
      where: { agentID: id },
      attributes: ["id", "date", "status", "type", "comment"],
      include: [
        // {
        //   model: BookingLocation,
        //   //attributes: ["locationID"],
        //   include: [
        //     {
        //       model: Location,
        //       attributes: ["name"],
        //     },
        //   ],
        // },
        {
          model: User,
          as: "booker",
          attributes: [
            "firstName",
            "lastName",
            "id",
            "avatar",
            "userName",
            "email",
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

const acceptBooking = async (req, res) => {
  const id = req.params.id;

  const booking = await Booking.findOne({
    where: { id },
  });

  if (!booking) {
    return res.status(404).json({ msg: "Booking Not Found" });
  }

  try {
    await Booking.update(
      {
        status: "ACCEPTED",
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ msg: "Booking accepted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const cancelBooking = async (req, res) => {
  const id = req.params.id;

  const booking = await Booking.findOne({
    where: { id },
  });

  if (!booking) {
    return res.status(404).json({ msg: "Booking Not Found" });
  }

  try {
    await Booking.update(
      {
        status: "CANCELLED",
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({ msg: "Booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getBookingsByUser = async (req, res) => {
  const id = req.params.id;

  try {
    const bookings = await Booking.findAll({
      where: { userID: id },
      attributes: ["id", "date", "status", "type", "comment"],
      include: [
        // {
        //   model: BookingLocation,
        //   //attributes: ["locationID"],
        //   include: [
        //     {
        //       model: Location,
        //       attributes: ["name"],
        //     },
        //   ],
        // },
        {
          model: User,
          as: "agent",
          attributes: ["firstName", "lastName"],
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

const updateDateBooking = async (req, res) => {
  const id = req.params.id;
  const { date } = req.body;
  const currentUser = req.user;

  if (!currentUser.isAgent) {
    return res.status(403).json({ msg: "Access Denied" });
  }

  //Validation
  const errors = [];

  if (!compareDateForUpdateBooking(date)) {
    errors.push({
      target: "date",
      msg:
        "La date de réservation doit être supérieure à la date d'aujourd'hui plus un jour !",
    });
    return res.status(400).json({ errors });
  }

  try {
    await Booking.update(
      {
        date,
      },
      { where: { id } }
    );
    return res.status(200).json({ msg: "Booking updated successfully" });
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
  acceptBooking,
  cancelBooking,
  getBookingsByUser,
  updateDateBooking,
};
