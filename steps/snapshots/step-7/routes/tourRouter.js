const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");

// Public routes
router.get("/", getAllTours);
router.get("/:tourId", getTourById);

// Protected routes
router.use(auth);

router.post("/", createTour);
router.put("/:tourId", updateTour);
router.delete("/:tourId", deleteTour);

module.exports = router;
