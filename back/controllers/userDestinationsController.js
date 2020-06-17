const {
  UserDestination,
  Destination,
  //Country,
  //Continent,
  PictureDestination,
  User,
} = require("../models");
const fs = require("fs");
const { makeKey } = require("../helpers");

const create = async (req, res) => {
  const id = req.user.id;
  //Validation
  const errors = [];
  if (req.body.lat === "" || req.body.lng === "") {
    errors.push({ target: "latlng", msg: "Veuillez renseigner une ville !" });
  }
  if (req.body.name === "") {
    errors.push({
      target: "name",
      msg: "Veuillez renseigner un titre à votre destination !",
    });
  } else if (req.body.name.length < 10 || req.body.name > 30) {
    errors.push({
      target: "name",
      msg:
        "Le titre de votre destination doit contenir entre 10 et 30 caractères !",
    });
  }
  if (req.body.date === "") {
    errors.push({
      target: "date",
      msg: "Veuillez renseigner une date à votre destination !",
    });
  }
  if (req.body.remarks === "") {
    errors.push({
      target: "remarks",
      msg: "Veuillez renseigner une description de votre destination !",
    });
  } else if (req.body.remarks.length < 100) {
    errors.push({
      target: "remarks",
      msg:
        "La description de votre destination doit contenir au moins 50 caractères !",
    });
  }
  if (req.body.coverImage === "") {
    errors.push({
      target: "coverImage",
      msg: "Veuillez séléctionner une image principale de votre destination !",
    });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const file = req.body.coverImage.split(";base64,");
  const extension = file[0].replace("data:image/", "");
  const filename = makeKey(10);
  // "../storage/destination/jsnjfsjnfsjf544.jpg | png..."
  const rootFile = [
    __dirname + "/../storage/destination/",
    filename,
    "." + extension,
  ].join("");
  const fileSendToDatabase = filename + "." + extension;

  fs.writeFile(rootFile, file[1], "base64", function (err) {
    console.log(err);
  });
  try {
    const destination = await Destination.create({
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      coverImage: fileSendToDatabase,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await UserDestination.create({
      userID: id,
      destinationID: destination.id,
      date: req.body.date,
      remarks: req.body.remarks,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    //Verify if user send pictures
    if (req.body.pictures.length > 0) {
      for (let i = 0; i < req.body.pictures.length; i++) {
        const file = req.body.pictures[i].content.split(";base64,");
        const extension = file[0].replace("data:image/", "");
        const filename = makeKey(10);
        const rootFile = [
          __dirname + "/../storage/destination/",
          filename,
          "." + extension,
        ].join("");
        const fileSendToDatabase = filename + "." + extension;
        fs.writeFile(rootFile, file[1], "base64", function (err) {
          console.log(err);
        });
        await PictureDestination.create({
          userID: id,
          destinationID: destination.id,
          path: fileSendToDatabase,
          name: destination.name,
          alt: destination.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    return res.status(200).json({ msg: "Destination created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

// const getAllContinents = async (req, res) => {
//   try {
//     const continents = await Continent.findAll({
//       attributes: ["id", "name"],
//     });
//     if (!continents) {
//       return res.status(404).json({ msg: "Continents Not Found" });
//     }
//     return res.status(200).json(continents);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Error Server" });
//   }
// };

const getAllDestinationsByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const destinations = await UserDestination.findAll({
      where: { userID: id },
      include: [
        {
          model: Destination,
          // include: [
          //   {
          //     model: Country,
          //   },
          //   {
          //     model: Continent,
          //   },
          // ],
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
  //getAllContinents,
  getPicturesDestinationByDestination,
};
