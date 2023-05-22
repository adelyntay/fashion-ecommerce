const express = require("express");
const router = express.Router();
const sizesController = require("../controllers/sizes");

router.post("/", sizesController.create);

module.exports = router;