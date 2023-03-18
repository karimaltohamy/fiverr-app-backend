const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  createReview,
  getReviews,
  deleteReviews,
} = require("../controls/review.control");

router.post("/", verifyToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", verifyToken, deleteReviews);

module.exports = router;
