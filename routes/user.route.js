const express = require("express");
const router = express.Router();
const { testFun } = require("../controls/user.control");

router.get("/test", testFun);

module.exports = router;
