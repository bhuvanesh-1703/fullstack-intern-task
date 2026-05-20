const User = require("../models/User");

// ADD FAVORITE

const addFavorite = async (req, res) => {
  try {
    console.log(req.params.templateId);
    const user = await User.findById(req.user.user_id);

    if (!user.favorites.includes(req.params.templateId)) {
      user.favorites.push(req.params.templateId);

      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Template added to favorites",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add favorite",
      error: error.message,
    });
  }
};

// GET FAVORITES

const getFavorites = async (req, res) => {
  try {

    console.log(req.user.user_id);
    const user = await User.findById(req.user.user_id).populate("favorites");

    return res.status(200).json({
      success: true,
      data: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favorites",
      error: error.message,
    });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
};
