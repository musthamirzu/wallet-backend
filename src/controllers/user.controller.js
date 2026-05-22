const { User, Wallet } = require("../models");

const sendResponse = require("../utils/response");
const userService = require(
  "../services/user.service"
);
const getProfile = async (req, res, next) => {
  try {

    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Wallet
        }
      ]
    });
    console.log(user,"User")
    return sendResponse(
      res,
      200,
      true,
      "Profile fetched successfully",
      user
    );

  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req,
  res,
  next
) => {
  try {

    const user =
      await userService.updateProfile(
        req.user.id,
        req.body
      );

    return sendResponse(
      res,
      200,
      true,
      "Profile updated successfully",
      user
    );

  } catch (error) {
    next(error);
  }
};
module.exports = {
  getProfile,updateProfile
};