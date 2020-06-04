const { Router } = require("express");
require("express-group-routes");

const router = Router();

const usersController = require("../controllers/usersController");
const bookingsController = require("../controllers/bookingsController");
const reviewsController = require("../controllers/reviewsController");
const messagesController = require("../controllers/messagesController");
const checkAuth = require("../middlewares/checkAuth");
const userDestinationsController = require("../controllers/userDestinationsController");

// users
router.get("/users", usersController.index);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.findOne);
router.put("/users/:id", checkAuth, usersController.update);
router.delete("/users/:id", checkAuth, usersController.destroy);
router.get(
  "/users/profile/agent/:id",
  checkAuth,
  usersController.getProfileAgent
);
router.get("/users/me/roles", checkAuth, usersController.getRoleUser);
router.put("/users/agent/:id", checkAuth, usersController.editProfileAgent);

// login auth
router.post("/login", usersController.login);
router.post("/logout", checkAuth, usersController.logout);
router.get("/me", usersController.me);

// bookings
router.get("/bookings", checkAuth, bookingsController.index);
router.post("/bookings", checkAuth, bookingsController.create);
router.get("/bookings/:id", checkAuth, bookingsController.findOne);
router.get("/bookings/:id/accept", checkAuth, bookingsController.acceptBooking);
router.put("/bookings/:id", checkAuth, bookingsController.update);
router.delete("/bookings/:id", checkAuth, bookingsController.destroy);
router.get(
  "/bookings/agent/:id",
  checkAuth,
  bookingsController.getBookingsByAgent
);

router.get("/reviews", reviewsController.index);
router.post("/reviews", checkAuth, reviewsController.create);
router.get("/reviews/:id", reviewsController.findOne);
router.put("/reviews/:id", checkAuth, reviewsController.update);
router.delete("/reviews/:id", checkAuth, reviewsController.destroy);
router.get(
  "/reviews/avgratings/agent/:id",
  checkAuth,
  reviewsController.getAvgRatingsAgent
);
router.get(
  "/reviews/comments/agent/:id",
  checkAuth,
  reviewsController.getAllCommentsReviewByAgent
);

// messages
router.get("/messages", checkAuth, messagesController.index);
router.post("/messages", checkAuth, messagesController.create);
//router.get("/messages/:id", checkAuth, messagesController.findOne);
router.get("/messages/:receiverID", checkAuth, messagesController.findMessages);
router.put("/messages/:id/:status", checkAuth, messagesController.update);
router.delete("/messages/:id", checkAuth, messagesController.destroy);
router.get(
  "/messages/users/:id",
  checkAuth,
  messagesController.getAllMessagesByUser
);
router.put(
  "/messages/:id/changestatus",
  checkAuth,
  messagesController.changeStatusMessage
);

// destinations
router.get(
  "/destinations/users/:id",
  checkAuth,
  userDestinationsController.getAllDestinationsByUser
);
router.get(
  "/destinations/users/:id/destination/:destinationId/pictures",
  checkAuth,
  userDestinationsController.getPicturesDestinationByDestination
);
router.get(
  "/users/:id/destination/:destinationId",
  checkAuth,
  userDestinationsController.getDestinationByUser
);
// router.get(
//   "/destinations/continents",
//   userDestinationsController.getAllContinents
// );
router.post("/destinations/new", checkAuth, userDestinationsController.create);

module.exports = router;
