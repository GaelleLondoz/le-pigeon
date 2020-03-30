// create interactions with database (ex: CRUD) for users
// already define by sequelize
// .findAll(), .findByPk()... = sequelize vocabulary
// send to ???????

const jwt = require('jsonwebtoken');
const {getHash} = require("../helpers/index")
const { User } = require("../models");

const index = (req, res) => {
  return User.findAll()
    .then(users => res.status(200).send(users))
    .catch(e => res.status(500).send(e));
};

const create = (req, res) => {
  const newUser = req.body.user;
  newUser.password = getHash(newUser.password)
  return User.create(newUser)
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
};

const findOne = (req, res) => {
    const id = req.params.id;
    return User.findByPk(id)
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
}

const update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));

}

const destroy = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
    .then(user => res.status(200).send(user))
    .catch(e => res.status(500).send(e));
};

const login = async (req, res) => {
  const {email, password} = req.body.login;

  if(email && password) {
    try {
      const user = await User.findOne({
        where: {
          email
        }
      })
      console.log(user)

      if (!user) {
        res.status(401).json({ message: 'No such user found' });
      }
  
      if (user.password === password) {
        let payload = { id: user.id };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ msg: 'ok', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }
    catch (e) {
      console.log(e)
    }


  }
}

module.exports = {
  index,
  create,
  findOne,
  update,
  destroy,
  login
};