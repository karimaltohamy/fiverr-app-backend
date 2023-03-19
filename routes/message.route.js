const express = require("express");
const router = express.Router();
const {createMessage,
    getMessages} = require("../controls/message.control")
const verifyToken = require("../middleware/verifyToken");


router.post("/", verifyToken,createMessage)
router.get("/:id", verifyToken, getMessages)

module.exports = router;
