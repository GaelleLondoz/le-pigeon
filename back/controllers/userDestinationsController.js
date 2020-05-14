const {
  UserDestination,
  Destination,
  Country,
  Continent,
  PictureDestination,
  User,
} = require("../models");

const getAllDestinationsByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const destinations = await UserDestination.findAll({
      where: { userID: id },
      include: [
        {
          model: Destination,
          include: [
            {
              model: Country,
            },
            {
              model: Continent,
            },
          ],
        },
      ],
    });
    if (!destinations) {
      return res.status(404).json({ msg: "Destinations Not Found" });
    }
    return res.status(200).json(destinations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getDestinationByUser = async (req, res) => {
  const id = req.params.id;
  const destinationId = req.params.destinationId;

  try {
    const destination = await UserDestination.findOne({
      where: { userID: id, destinationID: destinationId },
      include: [
        {
          model: Destination,
          include: [
            {
              model: Country,
            },
            {
              model: Continent,
            },
          ],
        },
      ],
    });
    if (!destination) {
      return res.status(404).json({ msg: "Destination Not Found" });
    }
    return res.status(200).json(destination);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

module.exports = {
  getAllDestinationsByUser,
  getDestinationByUser,
};
