const { Router } = require("express");
const router = Router();

const usersController = require('../controllers/usersController')
const bookingsController = require('../controllers/bookingsController')

// users
router.get('/users', usersController.index)
router.post('/users', usersController.create)
router.get('/users/:id', usersController.findOne)
router.put('/users/:id', usersController.update)
router.delete('/users/:id', usersController.destroy)

// bookings
router.get('/bookings', bookingsController.index)
router.post('/bookings', bookingsController.create)
router.get('/bookings/:id', bookingsController.findOne)
router.put('/bookings/:id', bookingsController.update)
router.delete('/bookings/:id', bookingsController.destroy)


module.exports = router