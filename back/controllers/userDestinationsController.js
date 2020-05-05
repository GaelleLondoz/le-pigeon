const {
  UserDestination,
  Destination,
  Country,
  Continent,
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
  }
};

module.exports = {
  getAllDestinationsByUser,
};
