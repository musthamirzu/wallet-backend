const authService = require("../services/auth.service");

const sendResponse = require("../utils/response");
const {
  sendOtp
} = require(
  "../services/otp.service"
);
const register = async (req, res, next) => {
  try {

    const { mobile } = req.body;

    const result = await authService.registerUser(mobile);

    return sendResponse(
      res,
      200,
      true,
      result.message
    );

  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {

    const { mobile, otp, name } = req.body;

    const result = await authService.verifyOtp(
      mobile,
      otp,
      name
    );

    return sendResponse(
      res,
      200,
      true,
      "Login successful",
      result
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyOtp
};