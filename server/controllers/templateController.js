const Template = require("../models/Template");

// GET ALL TEMPLATES

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();

    return res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
      error: error.message,
    });
  }
};

// GET SINGLE TEMPLATE

const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch template",
      error: error.message,
    });
  }
};

// TOGGLE TEMPLATE FAVORITE STATUS

const toggleFavorite = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    template.isFavorite = !template.isFavorite;
    await template.save();

    return res.status(200).json({
      success: true,
      message: `Template ${template.isFavorite ? "added to" : "removed from"} favorites`,
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to toggle favorite status",
      error: error.message,
    });
  }
};

module.exports = {
  getTemplates,
  getTemplateById,
  toggleFavorite,
};
