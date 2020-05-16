const {
  UserDestination,
  Destination,
  Country,
  Continent,
  PictureDestination,
  User,
} = require("../models");

const create = async (req, res) => {
  const id = req.user.id;
  //Probleme trouvez le moyen pour country.id ...
  try {
    const continent = Continent.create({
      name: req.body.continent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const country = Country.create({
      name: req.body.country,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const destination = Destination.create({
      countryID: country.id,
      continentID: continent.id,
      name: req.body.name,
      coverImage: req.body.coverImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    UserDestination.create({
      userID: id,
      destinationID: destination.id,
      date: "2017-12-26 16:11:50",
      remarks: req.body.remarks,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({ msg: "Destination created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

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
  create,
};
