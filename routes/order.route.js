const express = require("express");
const router = express.Router();
const { getOrders, intent,confirm } = require("../controls/order.control");
const verifyToken = require("../middleware/verifyToken");

router.post("/create-payment-intent/:id", verifyToken, intent);
router.get("/", verifyToken, getOrders);
router.put("/", verifyToken, confirm);

module.exports = router;
