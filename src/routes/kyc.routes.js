const express = require("express");

const router = express.Router();

const kycController = require(
  "../controllers/kyc.controller"
);

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const upload = require(
  "../config/multer"
);

router.post(
  "/upload",
  authMiddleware,
  upload.single("document"),
  kycController.uploadKyc
);

router.get(
  "/status",
  authMiddleware,
  kycController.getKycStatus
);

router.post(
  "/verify",
  authMiddleware,
  kycController.verifyKyc
);
module.exports = router;