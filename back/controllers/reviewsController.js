const sequelize = require("sequelize");
const { Review, User } = require("../models");

const index = (req, res) => {
  return Review.findAll()
    .then((reviews) => res.status(200).send(reviews))
    .catch((e) => res.status(500).send(e));
};

const create = (req, res) => {
  const newReview = req.body.review;
  newReview.status = "PENDING"


  return Review.create(newReview)
    .then(review => {
      res.status(200).send(review)
    }
    )
    .catch(e => res.status(500).send(e));
};

const findOne = (req, res) => {
  const id = req.params.id;
  return Review.findByPk(id)
    .then(review => res.status(200).send(review))
    .catch(e => res.status(500).send(e));
}

const update = (req, res) => {
  const id = req.params.id;
  Review.update(req.body, {
    where: { id: id }
  })
    .then(review => res.status(200).send(review))
    .catch(e => res.status(500).send(e));

  Review.update(req.body, {
    where: { id: id },
  })
    .then((review) => res.status(200).send(review))
    .catch((e) => res.status(500).send(e));
};

const destroy = (req, res) => {
  const id = req.params.id;
  Review.destroy({
    where: { id: id },
  })

    .then(() => res.status(200).json({ message: 'review deleted' }))
    .catch((e) => res.status(500).send(e));
};

const getAvgRatingsAgent = async (req, res) => {
  const id = req.params.id;
  // Verify if user connected is same of id payload
  // if (req.user.id != id) {
  //   return res.status(403).json({ msg: "Access Denied" });
  // }

  try {
    const avgRatings = await Review.findAll({
      where: { agentID: id },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "avgRatings"],
        [sequelize.fn("COUNT", sequelize.col("comment")), "countComments"],
      ],
    });
    if (!avgRatings) {
      return res.status(404).json({ msg: "AvgRatings Not Found" });
    }
    return res.status(200).json(avgRatings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const getAllCommentsReviewByAgent = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Review.findAll({
      where: { agentID: id },
      attributes: ["id", "comment", "rating", "authorID"],
      include: [
        {
          model: User,
          as: "author",
          attributes: ["firstName", "lastName", "avatar"],
        },
      ],
    });
    if (!comments) {
      return res.status(404).json({ msg: "Comments Not Found" });
    }
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Server" });
  }
};

const reviewsByAgent = (req, res) => {
  const id = req.params.agentID;
  Review.findAll({
    where: { agentID: id },
    include: [
      {
        model: User,
        as: "author"
      }
    ]
  })
    .then(review => {
      console.log(review)
      res.status(200).send(review)
    })
    .catch(e => res.status(500).send(e));

}
module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
  reviewsByAgent,
  getAvgRatingsAgent,
  getAllCommentsReviewByAgent,
};




