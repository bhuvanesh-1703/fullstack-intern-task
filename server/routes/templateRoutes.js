const express = require("express");

const {
  getTemplates,
  getTemplateById,
  toggleFavorite,
} = require("../controllers/templateController");

const router = express.Router();

router.get("/", getTemplates);

router.get("/:id", getTemplateById);

router.put("/:id/favorite", toggleFavorite);

module.exports = router;
