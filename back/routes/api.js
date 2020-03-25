const { Router } = require("express");
const router = Router();

const usersController = require('../controllers/usersController')

router.get('/users', usersController.index)
router.post('/users', usersController.create)

module.exports = router