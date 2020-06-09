const bcrypt = require("bcrypt");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const { getHash } = require("../helpers/index");

const { User, UserRole, Review, Role } = require("../models");

const db = require("../models/index");


const index = (req, res) => {
  return User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
  const newUser = req.body.user;
  newUser.password = getHash(newUser.password);
  return User.create(newUser)
    .then((user) => res.status(200).send(user))
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
    .then((user) => res.status(200).send(user))
    .catch((e) => res.status(500).send(e));
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
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "6000000",
          });

          res.json({ msg: "ok", token: token });
        } else {
          res.status(401).json({
            msg: "Unauthorized",
          });
        }
      });
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
          attributes: ["firstName", "lastName", "email", "userName", "avatar"],
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
}


const getReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await User.findAll({
      where: { id },
      include: [
        {
          model: Review,
          as: "reviews"
        }
      ]
    }
    );
    console.log(reviews)
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
          nested: true
        }
      ]
    });
    console.log(messages)
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
  const { firstName, lastName, userName, email } = req.body.User;
  const { language, price } = req.body;

  try {
    await User.update(
      {
        firstName,
        lastName,
        userName,
        email,
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
          attributes: ["id", "firstName", "lastName", "avatar"],
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
  getMessages
};
