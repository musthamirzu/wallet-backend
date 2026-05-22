const supabase = require("../config/supabase");
const axios = require("axios");
const { KYC } = require("../models");

const uploadKyc = async (
  userId,
  aadhaarNumber,
  file
) => {

  const fileName =
    `${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage
    .from("kyc-documents")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    });

  if (error) {
    throw new Error(error.message);
  }

  const publicUrl =
    `${process.env.SUPABASE_URL}/storage/v1/object/public/kyc-documents/${fileName}`;

  let kyc = await KYC.findOne({
    where: {
      user_id: userId
    }
  });

  if (kyc) {

    kyc.aadhaar_number = aadhaarNumber;
    kyc.document_url = publicUrl;
    kyc.status = "PENDING";

    await kyc.save();

  } else {

    kyc = await KYC.create({
      user_id: userId,
      aadhaar_number: aadhaarNumber,
      document_url: publicUrl
    });
  }

  return kyc;
};

const getKycStatus = async (userId) => {

  const kyc = await KYC.findOne({
    where: {
      user_id: userId
    }
  });

  return kyc;
};

module.exports = {
  uploadKyc,
  getKycStatus
};

const verifyAadhaar = async (
  userId,
  aadhaarNumber
) => {

  try {

    /*
      MOCK IMPLEMENTATION
      Replace with actual provider API
    */

    const isValid =
      aadhaarNumber.length === 12;

    if (!isValid) {
      throw new Error(
        "Invalid Aadhaar number"
      );
    }

    const kyc = await KYC.findOne({
      where: {
        user_id: userId
      }
    });

    if (!kyc) {
      throw new Error("KYC not found");
    }

    kyc.status = "VERIFIED";

    kyc.verified_at = new Date();

    await kyc.save();

    return kyc;

  } catch (error) {

    throw error;
  }
};