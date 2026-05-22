const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");
const passport = require(
  "passport"
);
const {
  registerValidation,
  verifyOtpValidation
} = require("../validations/auth.validation");

router.post(
  "/register",
  validate(registerValidation),
  authController.register
);

router.post(
  "/verify-otp",
  validate(verifyOtpValidation),
  authController.verifyOtp
);



router.get(

  "/google",

  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email"
      ],
      prompt:
      "select_account"
  }
    
  )
);

router.get(

  "/google/callback",

  passport.authenticate(
    "google",
    
    {
      session: false,
      failureRedirect:
        "/"
    }
  ),

  (req, res) => {

    console.log(
      "GOOGLE USER:",
      req.user
    );

    res.redirect(

      `http://localhost:5173/oauth-success?token=${req.user.token}`
    );
  }
);


module.exports = router;