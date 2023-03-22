const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  createGig,
  deleteGig,
  gitGig,
  getGigs,
} = require("../controls/gig.control");

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", gitGig);
router.get("/", getGigs);

module.exports = router;
