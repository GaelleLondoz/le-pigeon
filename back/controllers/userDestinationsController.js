const {
    UserDestination,
    Destination,
    PictureDestination,
    User,
} = require("../models");
const fs = require("fs");
const db = require("../models/index");
const sequelize = require("sequelize");
const { makeKey } = require("../helpers");

const create = async(req, res) => {
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
    } else if (req.body.name.length < 1 || req.body.name > 255) {
        errors.push({
            target: "name",
            msg: "Le titre de votre destination doit contenir des caractères !",
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
            msg: "La description de votre destination doit contenir au moins 100 caractères !",
        });
    }
    if (req.body.coverImage === "") {
        errors.push({
            target: "coverImage",
            msg: "Veuillez séléctionner une image principale de votre destination !",
        });
    }
    if (req.body.type === "") {
        errors.push({
            target: "type",
            msg: "Veuillez séléctionner un type de voyage !",
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

    fs.writeFile(rootFile, file[1], "base64", function(err) {
        console.log(err);
    });
    try {
        const destination = await Destination.create({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            type: req.body.type,
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
                fs.writeFile(rootFile, file[1], "base64", function(err) {
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

const getAllDestinationsByUser = async(req, res) => {
    const id = req.params.id;
    try {
        const destinations = await UserDestination.findAll({
            where: { userID: id },
            include: [{
                model: Destination,
                // include: [
                //   {
                //     model: Country,
                //   },
                //   {
                //     model: Continent,
                //   },
                // ],
            }, ],
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

const getDestinationByUser = async(req, res) => {
    const id = req.params.id;
    const destinationId = req.params.destinationId;

    try {
        const destination = await UserDestination.findOne({
            where: { userID: id, destinationID: destinationId },
            include: [{
                    model: Destination,
                },
                {
                    model: User,
                    attributes: ["firstName", "lastName", "avatar", "id"],
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

const getPicturesDestinationByDestination = async(req, res) => {
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

const getAllDestinationsByUsers = async(req, res) => {
    return UserDestination.findAll({
            include: [{
                model: Destination,
                attributes: ["id", "lat", "lng", "type"],
            }, ],
        })
        .then((users) => res.status(200).send(users))
        .catch((e) => res.status(500).send(e));
};
const getProxyDestinations = async(req, res) => {
    try {
        const { lat, lng } = req.params;
        const dis = 50;
        const limit = 100;

        // https://stackoverflow.com/a/20437045
        const query = `SELECT id, lat, lng, type, 3956 * 2 
    * ASIN(SQRT(POWER(SIN((:lat - lat) * pi() / 180 / 2), 2)
    + COS(:lat * pi() / 180) * COS(lat * pi() / 180)
    * POWER(SIN((:lng - lng) * pi() / 180 / 2), 2)))
    as distance FROM Destinations WHERE
    lng between(:lng - :dis / cos(radians(:lat)) * 69)
    and(:lng + :dis / cos(radians(:lat)) * 69)
    and lat between(:lat - (:dis / 69))
    and(:lat + (:dis / 69))
    having distance < :dis ORDER BY distance limit :limit`;
        const result = await db.sequelize.query(query, {
            replacements: { lat, lng, dis, limit },
            type: sequelize.QueryTypes.SELECT,
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Server" });
    }
};
const searchAgentByDestAndType = async(req, res) => {
    const { type, lat, lng } = req.query;
    const errors = [];

    if (
        lat === "null" ||
        (lat === undefined && lng === "null") ||
        lng === undefined
    ) {
        errors.push({
            target: "latlng",
            msg: "Veuillez insérer une destination !",
        });
    }
    if (type === "" || undefined) {
        errors.push({
            target: "type",
            msg: "Veuillez séléctionner un type !",
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    //Validation ok
    try {
        const agents = await db.sequelize.query(
            "Select users.firstName, users.lastName, users.id, users.avatar, AVG(Reviews.rating) as avgRatings FROM Reviews, users, userdestinations,destinations as dest WHERE users.id=userdestinations.userID AND userdestinations.destinationID=dest.id AND users.id = Reviews.agentID AND CAST(dest.lat as CHAR) LIKE BINARY :lat AND CAST(dest.lng as CHAR) LIKE BINARY :lng AND dest.type like :type AND Users.isAgent = 1 GROUP BY Users.firstName, Users.lastName, Reviews.agentID ORDER BY avgRatings DESC", {
                replacements: { lat: lat, lng: lng, type: type },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        if (agents.length === 0) {
            return res.status(500).json({ msg: "Agents Not Found" });
        }
        return res.status(200).json(agents);
    } catch (error) {
        return res.status(500).json({ msg: "Error Server" });
    }
};

const getDestinationTypes = async(req, res) => {
    try {
        var types = Destination.rawAttributes.type.values;
        return res.status(200).json(types);
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
    getAllDestinationsByUsers,
    getProxyDestinations,
    searchAgentByDestAndType,
    getDestinationTypes,
};