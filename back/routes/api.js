const { Router } = require("express");
require("express-group-routes");

const router = Router();

const usersController = require("../controllers/usersController");
const bookingsController = require("../controllers/bookingsController");
const reviewsController = require("../controllers/reviewsController");
const messagesController = require("../controllers/messagesController");
const checkAuth = require("../middlewares/checkAuth");
const userDestinationsController = require("../controllers/userDestinationsController");
const rolesController = require("../controllers/rolesController");
const faqsController = require("../controllers/faqsController");

// users
router.get("/users", usersController.index);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.findOne);
router.get("/users/agents/best", usersController.getBestAgents);
router.get("/users/agent/:id/public", usersController.getPublicProfileAgent);
router.put("/users/:id", checkAuth, usersController.update);
router.delete("/users/:id", checkAuth, usersController.destroy);
router.get(
  "/users/profile/agent/:id",
  checkAuth,
  usersController.getProfileAgent
);
router.get("/users/sales/recent", checkAuth, usersController.getRecentSales);
router.get("/users/orders/recent", checkAuth, usersController.getRecentOrders);
router.put("/users/role/:id", checkAuth, usersController.setRoleAdminByUserID);
router.get("/users/role/:id", checkAuth, usersController.getRoleByUserID);
router.get("/users/me/roles", checkAuth, usersController.getRoleUser);
router.put("/users/agent/:id", checkAuth, usersController.editProfileAgent);
router.get("/users/:id/reviews", usersController.getReviews);
router.get("/users/:id/messages", usersController.getMessages);
router.get(
  "/users/profile/user/:id",
  checkAuth,
  usersController.getProfileUser
);
router.put("/users/user/:id", checkAuth, usersController.editProfileUser);
router.get(
  "/users/search/agents",
  userDestinationsController.searchAgentByDestAndType
);
router.get("/users/become/agent", checkAuth, usersController.becomeAgent);
// login auth
router.post("/login", usersController.login);
router.post("/logout", checkAuth, usersController.logout);
router.get("/me", usersController.me);
router.get("/users/me/admin", checkAuth, usersController.admin);

// bookings
router.get("/bookings", checkAuth, bookingsController.index);
router.post("/bookings/:id", checkAuth, bookingsController.create);
router.get("/bookings/:id", checkAuth, bookingsController.findOne);
router.put("/bookings/:id/accept", checkAuth, bookingsController.acceptBooking);
router.put("/bookings/:id/cancel", checkAuth, bookingsController.cancelBooking);
router.put("/bookings/:id", checkAuth, bookingsController.update);
router.delete("/bookings/:id", checkAuth, bookingsController.destroy);
router.get(
  "/bookings/agent/:id",
  checkAuth,
  bookingsController.getBookingsByAgent
);
router.get(
  "/bookings/user/:id",
  checkAuth,
  bookingsController.getBookingsByUser
);
router.put(
  "/bookings/:id/update",
  checkAuth,
  bookingsController.updateDateBooking
);

// reviews
router.get("/reviews", reviewsController.index);
router.post("/reviews", reviewsController.create);
router.get("/reviews/:id", reviewsController.findOne);
router.get(
  "/reviews/avgratings/agent/:id",
  reviewsController.getAvgRatingsAgent
);
router.get(
  "/reviews/comments/agent/:id",
  reviewsController.getAllCommentsReviewByAgent
);
router.put("/reviews/:id/:status", reviewsController.update);
router.delete("/reviews/:id", reviewsController.destroy);
router.get("/reviews/agent/:agentID", reviewsController.reviewsByAgent);

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
  "/messages/:id/changestatus/:status",
  checkAuth,
  messagesController.changeStatusMessage
);
router.post("/messages/:id", checkAuth, messagesController.newMessage);

// destinations
router.get(
  "/destinations/users/:id",
  userDestinationsController.getAllDestinationsByUser
);
router.get(
  "/destinations/users/:id/destination/:destinationId/pictures",
  userDestinationsController.getPicturesDestinationByDestination
);
router.get(
  "/users/:id/destination/:destinationId",
  userDestinationsController.getDestinationByUser
);
router.get(
  "/destinations",
  userDestinationsController.getAllDestinationsByUsers
);

// router.get(
//   "/destinations/continents",
//   userDestinationsController.getAllContinents
// );
router.post("/destinations/new", checkAuth, userDestinationsController.create);
router.get(
  "/proxy-destinations/:lat/:lng",
  userDestinationsController.getProxyDestinations
);

// roles
router.get("/roles", checkAuth, rolesController.index);
router.post("/roles", checkAuth, rolesController.create);
router.get("/roles/:id", checkAuth, rolesController.findOne);
router.put("/roles/:id", checkAuth, rolesController.update);
router.delete("/roles/:id", checkAuth, rolesController.destroy);

// faqs
router.get("/faqs", faqsController.index);
router.post("/faqs", faqsController.create);
router.get("/faqs/:id", faqsController.findOne);
router.put("/faqs/:id", faqsController.update);
router.delete("/faqs/:id", faqsController.destroy);
router.get("/faqs-featured", faqsController.findAllFaqsFeatured);
router.get("/faqs-agents", faqsController.findAllFaqsAgents);
router.get("/faqs-futur-travellers", faqsController.findAllFaqsFuturTravellers);
router.get("/faqs-others", faqsController.findAllFaqsOthers);

module.exports = router;
