const passport =
  require("passport");

const GoogleStrategy =
  require(
    "passport-google-oauth20"
  ).Strategy;

const {
  User,
  Wallet
} = require("../models");

const generateToken =
  require("../utils/token");

passport.use(

  new GoogleStrategy(

    {
      clientID:
        process.env
          .GOOGLE_CLIENT_ID,

      clientSecret:
        process.env
          .GOOGLE_CLIENT_SECRET,

      callbackURL:
        process.env
          .GOOGLE_CALLBACK_URL
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        console.log(
          "PROFILE:",
          profile.displayName
        );

        const email =
          profile.emails[0].value;

        let user =
          await User.findOne({
            where: {
              mobile: email
            }
          });

        if (!user) {

          user =
            await User.create({

              mobile: email,

              name:
                profile.displayName,

              is_verified: true
            });

          await Wallet.create({
            user_id: user.id
          });
        }

        const token =
          generateToken({
            id: user.id,
            mobile:
              user.mobile
          });

        return done(null, {
          token,
          user
        });

      } catch (error) {

        console.log(error);

        return done(error);
      }
    }
  )
);

module.exports =
  passport;