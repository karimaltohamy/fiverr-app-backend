const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controls/order.control");
const verifyToken = require("../middleware/verifyToken");

router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;
