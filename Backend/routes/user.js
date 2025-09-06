const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/profile/:id", userController.getProfile);
router.get("/:id", userController.getUser);

module.exports = router;