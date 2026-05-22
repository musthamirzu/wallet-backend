const kycService = require(
  "../services/kyc.service"
);

const sendResponse = require(
  "../utils/response"
);

const uploadKyc = async (
  req,
  res,
  next
) => {
  try {

    const { aadhaar_number } = req.body;

    const file = req.file;

    const kyc =
      await kycService.uploadKyc(
        req.user.id,
        aadhaar_number,
        file
      );

    return sendResponse(
      res,
      200,
      true,
      "KYC uploaded successfully",
      kyc
    );

  } catch (error) {
    next(error);
  }
};

const getKycStatus = async (
  req,
  res,
  next
) => {
  try {

    const kyc =
      await kycService.getKycStatus(
        req.user.id
      );

    return sendResponse(
      res,
      200,
      true,
      "KYC fetched successfully",
      kyc
    );

  } catch (error) {
    next(error);
  }
};
const verifyKyc = async (
  req,
  res,
  next
) => {
  try {

    const { aadhaar_number } =
      req.body;

    const result =
      await kycService.verifyAadhaar(
        req.user.id,
        aadhaar_number
      );

    return sendResponse(
      res,
      200,
      true,
      "KYC verified successfully",
      result
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadKyc,
  getKycStatus,
  verifyKyc
};