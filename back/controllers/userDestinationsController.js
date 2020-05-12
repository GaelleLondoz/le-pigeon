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
            //Verify to fix problem => image is not always related with agent => il se fixe sur id de la destination qui peut contenir des photos d'autres agents ??
            {
              model: PictureDestination,
              attributes: ["path", "name", "alt"],
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
  }
};

module.exports = {
  getAllDestinationsByUser,
};
