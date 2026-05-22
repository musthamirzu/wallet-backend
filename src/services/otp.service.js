const twilio =
  require("twilio");

const client =
  twilio(
    process.env
      .TWILIO_ACCOUNT_SID,

    process.env
      .TWILIO_AUTH_TOKEN
  );


// SEND OTP
const sendOtp = async (
  mobile
) => {

  try {

    await client.verify.v2
      .services(
        process.env
          .VERIFY_SERVICE_SID
      )
      .verifications
      .create({

        to:
          `+91${mobile}`,

        channel: "sms"
      });

    return true;

  } catch (error) {

    console.log(
      "Twilio Send OTP Error:",
      error.message
    );

    return false;
  }
};


// VERIFY OTP
const verifyOtpCode =
  async (
    mobile,
    otp
  ) => {

    try {

      const verification =
        await client.verify.v2
          .services(
            process.env
              .VERIFY_SERVICE_SID
          )
          .verificationChecks
          .create({

            to:
              `+91${mobile}`,

            code: otp
          });
          console.log(
  process.env.VERIFY_SERVICE_SID
);
      return (
        verification.status ===
        "approved"
      );

    } catch (error) {

      console.log(
        "Twilio Verify Error:",
        error.message
      );

      return false;
    }
  };

module.exports = {
  sendOtp,
  verifyOtpCode
};