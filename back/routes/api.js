const { Router } = require("express");
const router = Router();

const usersController = require('../controllers/usersController')

router.get('/users', usersController.index)
router.post('/users', usersController.create)
router.get('/users/:id', usersController.findOne)
router.put('/users/:id', usersController.update)
router.delete('/users/:id', usersController.destroy)


module.exports = router