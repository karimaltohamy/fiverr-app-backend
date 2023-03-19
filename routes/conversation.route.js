const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
} = require("../controls/conversation.control");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, createConversation);
router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getConversation);
router.put("/:id", verifyToken, updateConversation);

module.exports = router;
