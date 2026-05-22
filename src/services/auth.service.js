const {
  User,
  Wallet
} = require("../models");

const generateToken =
  require("../utils/token");

const {
  sendOtp,
  verifyOtpCode
} = require("./otp.service");


// REGISTER + SEND OTP
const registerUser =
  async (mobile) => {

    let user =
      await User.findOne({
        where: { mobile }
      });

    // Create new user
    if (!user) {

      user =
        await User.create({
          mobile
        });

      await Wallet.create({
        user_id: user.id
      });
    }

    // Send OTP via Twilio
    await sendOtp(mobile);

    return {
      success: true,
      message:
        "OTP sent successfully"
    };
};


// VERIFY OTP
const verifyOtp =
  async (
    mobile,
    otp,
    name
  ) => {

    // Verify using Twilio
    const isValid =
      await verifyOtpCode(
        mobile,
        otp
      );

    if (!isValid) {

      throw new Error(
        "Invalid OTP"
      );
    }

    // Find user
    let user =
      await User.findOne({

        where: { mobile },

        include: [
          {
            model: Wallet
          }
        ]
      });

    if (!user) {

      user =
        await User.create({
          mobile,
          name
        });

      await Wallet.create({
        user_id: user.id
      });
    }

    // Save name if new user
    if (
      name &&
      !user.name
    ) {

      user.name = name;
    }

    user.is_verified = true;

    await user.save();

    // Generate JWT
    const token =
      generateToken({
        id: user.id,
        mobile: user.mobile
      });

    return {

      token,

      user: {
        id: user.id,
        mobile: user.mobile,
        name: user.name,
        is_verified:
          user.is_verified,

        wallet: user.Wallet
      }
    };
};

module.exports = {
  registerUser,
  verifyOtp
};