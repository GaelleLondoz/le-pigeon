const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getHash } = require("../helpers/index");

const { User, UserRole, Review, Role, Booking } = require("../models");

const db = require("../models/index");
const { makeKey, validateEmail } = require("../helpers");

const index = (req, res) => {
  return User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
  const newUser = req.body.user;
  //const updatedAt = new Date(Date.now()).toDateString();
  const updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  newUser.password = getHash(newUser.password);
  return User.create(newUser)
    .then((user) => {
      const result = db.sequelize.query(
        "INSERT INTO userroles (userID,roleID,language,updatedAt) values (" +
          user.id +
          ",(select id from roles WHERE name='ROLE_USER'),'French'," +
          `'${updatedAt}'` +
          ")",
        { type: sequelize.QueryTypes.INSERT }
      );
      return res.status(200).send(user);
    })
    .catch((e) => res.status(500).send(e));
};

const findOne = (req, res) => {
  const id = req.params.id;
  return User.findByPk(id)
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
};

const update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((user) => res.sendStatus(200).send(user))
    .catch((e) => res.sendStatus(500).send(e));
};

const login = async (req, res) => {
  const { email, password } = req.body.login;

  if (email && password) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      console.log(user);

      if (!user) {
        res.status(401).json({ message: "No such user found" });
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            isAgent: user.isAgent,
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6000000",
          });

          res.json({ msg: "ok", token: token, user: payload });
        } else {
          res.status(401).json({ msg: "Password is incorrect" });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};

const me = async (req, res) => {
  const headerAuth = req.headers.authorization;
  console.log({
    req,
    headerAuth,
    "req.headers.authorization": req.headers.authorization,
    "process.env.JWT_SECRET": process.env.JWT_SECRET,
  });
  try {
    let checkStatus = jwt.verify(headerAuth, process.env.JWT_SECRET);
    if (checkStatus != null) {
      res.status(200).json({
        msg: "Token is still valid",
        token: headerAuth,
        user: checkStatus,
      });
      // const user = await User.findOne({
      //   where: {
      //     email,
      //   },
      // });
      // console.log(user);

      // if (!user) {
      //   res.status(401).json({ message: "No such user found" });
      // }
      // bcrypt.compare(password, user.password, function (err, result) {
      //   if (result) {
      //     let payload = {
      //       id: user.id,
      //       firstName: user.firstName,
      //       lastName: user.lastName,
      //       avatar: user.avatar,
      //       isAgent: user.isAgent,
      //     };
      //     let token = jwt.sign(payload, process.env.JWT_SECRET, {
      //       expiresIn: "6000000",
      //     });

      //     res.json({ msg: "ok", token: token });
      //   } else {
      //     res.status(401).json({
      //       msg: "Unauthorized",
      //     });
      //   }
      // });
    }
  } catch (e) {
    throw e;
  }
};
const logout = (req, res) => {
  const headerAuth = req.headers.authorization;
  const verifyOptions = {
    expiresIn: "0",
  };

  const checkStatus = jwt.verify(
    headerAuth,
    process.env.JWT_SECRET,
    verifyOptions
  );
  console.log({ checkStatus });
  if (checkStatus != null) {
    res.status(200).json({});
  } else {
    res.status(401).json({
      msg: "Unauthorized",
    });
  }
};

const getRoleUser = async (req, res) => {
  const id = req.user.id;
  console.log("role userrrr");
  try {
    const role = await UserRole.findOne({
      where: { userID: id },
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    if (!role) {
      return res.status(404).json({ msg: "Role Not Found" });
    }
    return res.status(200).json(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getProfileAgent = async (req, res) => {
  const id = req.params.id;
  //Verify if user connected is same of id
  /*
          if (req.user.id != id) {
              return res.status(403).json({ msg: "Access Denied" });
          }
        */

  try {
    const agent = await UserRole.findOne({
      where: { userID: id, roleID: 2 },
      include: [
        {
          model: User,
          attributes: [
            "firstName",
            "lastName",
            "email",
            "userName",
            "avatar",
            "description",
          ],
        },
      ],
    });
    if (!agent) {
      return res.status(404).json({ msg: "Agent Not Found" });
    }

    return res.status(200).json(agent);
  } catch (error) {
    console.log(error);
  }
};

const getReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await User.findAll({
      where: { id },
      include: [
        {
          model: Review,
          as: "reviews",
        },
      ],
    });
    console.log(reviews);
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await User.findAll({
      where: { id },
      include: [
        {
          model: Message,
          nested: true,
        },
      ],
    });
    console.log(messages);
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// const getReviews = async (req, res) => {
//   const id = req.params.id;
//   User.findByPk(id)
// .getReviews()
// reviews = await User.sequelize.query(`SELECT u.firstName, u.lastName, u.avatar, r.rating, r.comment, r.createdAt FROM Users as u INNER JOIN Reviews as r on u.id = r.authorID where r.agentID =  ${id}`, {
// type: User.sequelize.QueryTypes.SELECT
// })
//     .then((user) => {
//       res.status(200).send(user);
//       console.log(user)
//     })
//     .catch((e) => res.status(500).send(e));
// }

const editProfileAgent = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    userName,
    email,
    avatar,
    description,
  } = req.body.User;
  const { language, price } = req.body;
  const emailExist = await User.findOne({
    where: { email },
  });
  const currentUser = await User.findOne({
    where: { id },
    raw: true,
  });
  let fileSendToDatabase;
  //Validation
  const errors = [];

  if (firstName === "") {
    errors.push({
      target: "firstName",
      msg: "Veuillez renseigner votre prénom !",
    });
  } else if (firstName.length < 2 || firstName.length > 30) {
    errors.push({
      target: "firstName",
      msg: "Votre prénom doit contenir entre 2 et 30 caractères !",
    });
  }

  if (lastName === "") {
    errors.push({ target: "lastName", msg: "Veuillez renseigner votre nom !" });
  } else if (lastName.length < 2 || lastName.length > 30) {
    errors.push({
      target: "lastName",
      msg: "Votre nom doit contenir entre 2 et 30 caractères !",
    });
  }

  if (email === "") {
    errors.push({
      target: "email",
      msg: "Veuillez renseigner votre adresse email !",
    });
  } else if (!validateEmail(email)) {
    errors.push({
      target: "email",
      msg: "Votre renseigner une adresse email valide !",
    });
  } else if (emailExist && emailExist.email !== currentUser.email) {
    errors.push({ target: "email", msg: "Cette adresse email existe déjà !" });
  }

  if (language === "") {
    errors.push({
      target: "language",
      msg: "Veuillez renseigner votre langue !",
    });
  }

  if (price === "") {
    errors.push({
      target: "price",
      msg: "Veuillez renseigner votre prix par heure !",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (avatar !== currentUser.avatar) {
    const file = avatar.split(";base64,");
    const extension = file[0].replace("data:image/", "");
    const filename = makeKey(10);
    const rootFile = [
      __dirname + "/../storage/avatar/",
      filename,
      "." + extension,
    ].join("");
    fileSendToDatabase = filename + "." + extension;

    fs.writeFile(rootFile, file[1], "base64", function (err) {
      console.log(err);
    });
  } else {
    fileSendToDatabase = currentUser.avatar;
  }

  try {
    await User.update(
      {
        firstName,
        lastName,
        userName,
        email,
        description,
        avatar: fileSendToDatabase,
      },
      {
        where: { id },
      }
    );
    await UserRole.update(
      {
        language,
        price,
      },
      {
        where: { userID: id },
      }
    );
    return res.status(200).json({ msg: "Test Updated Agent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};
const getBestAgents = async (req, res) => {
  try {
    // const agents = await Review.findAll({
    //   order: sequelize.literal("avgRatings DESC"),
    //   limit: 4,
    //   attributes: [
    //     [sequelize.fn("AVG", sequelize.col("rating")), "avgRatings"],
    //   ],
    //   include: [
    //     {
    //       model: User,
    //       as: "agent",
    //       attributes: ["firstName", "lastName", "avatar", "id"],
    //       duplicating: false,
    //     },
    //   ],
    //   group: ["agent.id", "review.id"],
    // });
    // const agents = await User.findAll({
    //   order: sequelize.literal("avgRatings DESC"),
    //   limit: 4,
    //   attributes: [
    //     "id",
    //     "firstName",
    //     "lastName",
    //     "avatar",
    //     [sequelize.fn("AVG", sequelize.col("reviews.rating")), "avgRatings"],
    //   ],
    //   include: [
    //     {
    //       model: Review,
    //       as: "reviews",
    //       attributes: [],
    //       duplicating: false,
    //     },
    //   ],
    //   group: ["user.id", "user.firstName", "user.lastName", "reviews.agentID"],
    // });
    const agents = await db.sequelize.query(
      "SELECT Users.id, Users.firstName, Users.lastName, Users.avatar, AVG(Reviews.rating) AS avgRatings, UserRoles.roleID FROM Users JOIN Reviews ON Users.id = Reviews.agentID JOIN UserRoles ON UserRoles.roleID = 2 GROUP BY Users.firstName, Users.lastName, Reviews.agentID ORDER BY avgRatings DESC LIMIT 4",
      { type: sequelize.QueryTypes.SELECT }
    );
    if (!agents) {
      return res.status(404).json({ msg: "Agents Not Found" });
    }
    return res.status(200).json(agents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getPublicProfileAgent = async (req, res) => {
  const id = req.params.id;
  try {
    const agent = await UserRole.findOne({
      where: { userID: id },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "avatar", "description"],
        },
      ],
    });
    if (!agent) {
      return res.status(404).json({ msg: "Agent Not Found" });
    }
    return res.status(200).json(agent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getProfileUser = async (req, res) => {
  const id = req.params.id;
  if (parseInt(id) !== req.user.id) {
    return res.status(403).json({ msg: "Access Denied" });
  }
  try {
    const user = await User.findOne({
      where: { id },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "userName",
        "email",
        "avatar",
        "createdAt",
      ],
    });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const editProfileUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, userName, email, avatar } = req.body;
  let fileSendToDatabase;
  if (parseInt(id) !== req.user.id) {
    return res.status(403).json({ msg: "Access Denied" });
  }

  const emailExist = await User.findOne({
    where: { email },
  });

  const currentUser = await User.findOne({
    where: { id },
    raw: true,
  });

  const errors = [];

  if (firstName === "") {
    errors.push({
      target: "firstName",
      msg: "Veuillez renseigner votre prénom !",
    });
  } else if (firstName.length < 2 || firstName.length > 30) {
    errors.push({
      target: "firstName",
      msg: "Votre prénom doit contenir entre 2 et 30 caractères !",
    });
  }

  if (lastName === "") {
    errors.push({ target: "lastName", msg: "Veuillez renseigner votre nom !" });
  } else if (lastName.length < 2 || lastName.length > 30) {
    errors.push({
      target: "lastName",
      msg: "Votre nom doit contenir entre 2 et 30 caractères !",
    });
  }

  if (email === "") {
    errors.push({
      target: "email",
      msg: "Veuillez renseigner votre adresse email !",
    });
  } else if (!validateEmail(email)) {
    errors.push({
      target: "email",
      msg: "Votre renseigner une adresse email valide !",
    });
  } else if (emailExist && emailExist.email !== currentUser.email) {
    errors.push({ target: "email", msg: "Cette adresse email existe déjà !" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Verify if user change avatar or not
  // Todo => if user change avatar, delete old avatar in folder avatar
  if (avatar !== currentUser.avatar) {
    const file = avatar.split(";base64,");
    const extension = file[0].replace("data:image/", "");
    const filename = makeKey(10);
    const rootFile = [
      __dirname + "/../storage/avatar/",
      filename,
      "." + extension,
    ].join("");
    fileSendToDatabase = filename + "." + extension;

    fs.writeFile(rootFile, file[1], "base64", function (err) {
      console.log(err);
    });
  } else {
    fileSendToDatabase = currentUser.avatar;
  }

  try {
    await User.update(
      {
        firstName,
        lastName,
        email,
        userName,
        avatar: fileSendToDatabase,
      },
      { where: { id } }
    );
    return res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};
const getRoleByUserID = async (req, res) => {
  const id = req.params.id;
  try {
    const role = await UserRole.findOne({
      where: { userID: id },
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    if (!role) {
      return res.status(404).json({ msg: "Role Not Found" });
    }
    return res.status(200).json(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const setRoleAdminByUserID = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.sequelize.query(
      "UPDATE userroles SET userroles.roleID = (select roles.id from roles where name like 'ROLE_ADMIN') WHERE userroles.userID=" +
        id,
      { type: sequelize.QueryTypes.UPDATE }
    );
    if (!result) {
      return res.status(403).json({ msg: "Role Not Found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getRecentSales = async (req, res) => {
  try {
    const sales = await db.sequelize.query(
      "SELECT users.firstName as firstname, users.lastName as lastname, SUM(price) as sales from userroles,bookings,roles,users " +
        "WHERE userroles.userID = users.id and userroles.userID = bookings.agentID and userroles.roleID = roles.id " +
        "AND MONTH(CURRENT_DATE - INTERVAL 1 MONTH) = MONTH(bookings.createdAt - INTERVAL 1 MONTH) " +
        "AND bookings.status like 'Acceptée' and users.isAgent = 1 GROUP BY users.id ORDER BY sales ASC",
      { type: sequelize.QueryTypes.SELECT }
    );
    if (!sales) {
      return res.status(403).json({ msg: "Recent sales not found" });
    }
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const orders = await db.sequelize.query(
      "SELECT bookings.date as date, users.firstName as firstname, users.lastName as lastname, userroles.price " +
        "FROM userroles,bookings,roles,users " +
        "WHERE userroles.userID = users.id and userroles.userID = bookings.agentID and userroles.roleID = roles.id " +
        "AND MONTH(CURRENT_DATE - INTERVAL 1 MONTH) = MONTH(bookings.createdAt - INTERVAL 1 MONTH) " +
        "AND bookings.status like 'Acceptée' and users.isAgent = 1",
      { type: sequelize.QueryTypes.SELECT }
    );
    if (!orders) {
      return res.status(403).json({ msg: "Recent orders not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const admin = async (req, res) => {
  const id = req.user.id;

  try {
    const admin = await db.sequelize.query(
      "SELECT users.firstName as firstname, users.lastName as lastname from userroles,users " +
        "WHERE userroles.userID = " +
        id +
        " and users.id = userroles.id AND userroles.roleID = (SELECT roles.id FROM roles WHERE roles.name like 'ROLE_ADMIN')",
      { type: sequelize.QueryTypes.SELECT }
    );
    if (!admin) {
      return res.status(403).json({ msg: "User not administrator" });
    }
    return res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};
module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
  login,
  me,
  logout,
  getProfileAgent,
  getRoleUser,
  editProfileAgent,
  getBestAgents,
  getPublicProfileAgent,
  getReviews,
  getMessages,
  getProfileUser,
  editProfileUser,
  getRoleByUserID,
  setRoleAdminByUserID,
  getRecentSales,
  getRecentOrders,
  admin,
};
