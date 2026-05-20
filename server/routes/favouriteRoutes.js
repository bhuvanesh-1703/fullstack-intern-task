const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  addFavorite,
  getFavorites,
} = require("../controllers/favouriteController");

const router = express.Router();

router.post("/:templateId", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);

module.exports = router;
