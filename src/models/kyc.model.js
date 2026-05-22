const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const KYC = sequelize.define(
  "KYC",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    aadhaar_number: {
      type: DataTypes.STRING
    },

    document_url: {
      type: DataTypes.TEXT
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "VERIFIED",
        "REJECTED"
      ),
      defaultValue: "PENDING"
    },

    verified_at: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: "kyc_verifications",
    timestamps: true,
    underscored: true
  }
);

module.exports = KYC;