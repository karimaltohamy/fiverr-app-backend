const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controls/user.control");
const verifyToken = require("../middleware/verifyToken");

router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
