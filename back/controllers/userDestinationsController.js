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
  //Trouvez une solution => lorsque le continent ou le pays existe déjà en base de donnée, il l'enregistre quand meme, => Doublon!!
  try {
    const continent = await Continent.create({
      name: req.body.continent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const country = await Country.create({
      name: req.body.country,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const destination = await Destination.create({
      countryID: country.id,
      continentID: continent.id,
      name: req.body.name,
      coverImage: req.body.coverImage,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await UserDestination.create({
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

const getAllContinents = async (req, res) => {
  try {
    const continents = await Continent.findAll({
      attributes: ["id", "name"],
    });
    if (!continents) {
      return res.status(404).json({ msg: "Continents Not Found" });
    }
    return res.status(200).json(continents);
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

const getPicturesDestinationByDestination = async (req, res) => {
  const id = req.params.id;
  const destinationId = req.params.destinationId;

  try {
    const pictures = await PictureDestination.findAll({
      where: { userID: id, destinationID: destinationId },
    });
    if (!pictures) {
      return res.status(404).json({ msg: "Pictures Not Found" });
    }
    return res.status(200).json(pictures);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

module.exports = {
  getAllDestinationsByUser,
  getDestinationByUser,
  create,
  getAllContinents,
  getPicturesDestinationByDestination,
};
