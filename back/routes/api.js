const { Router } = require("express");
const router = Router();

const usersController = require("../controllers/usersController");
const bookingsController = require("../controllers/bookingsController");
const reviewsController = require("../controllers/reviewsController");
const messagesController = require("../controllers/messagesController");

// users
router.get("/users", usersController.index);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.findOne);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.destroy);

// login auth
router.post("/login", usersController.login);
router.get("/me", usersController.me);

// bookings
router.get("/bookings", bookingsController.index);
router.post("/bookings", bookingsController.create);
router.get("/bookings/:id", bookingsController.findOne);
router.put("/bookings/:id", bookingsController.update);
router.delete("/bookings/:id", bookingsController.destroy);

// reviews
router.get("/reviews", reviewsController.index);
router.post("/reviews", reviewsController.create);
router.get("/reviews/:id", reviewsController.findOne);
router.put("/reviews/:id", reviewsController.update);
router.delete("/reviews/:id", reviewsController.destroy);

// messages
router.get("/messages", messagesController.index);
router.post("/messages", messagesController.create);
router.get("/messages/:id", messagesController.findOne);
router.put("/messages/:id", messagesController.update);
router.delete("/messages/:id", messagesController.destroy);

module.exports = router;
