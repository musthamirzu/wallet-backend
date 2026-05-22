const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OTP = sequelize.define(
  "OTP",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "otps",
    timestamps: true,
    underscored: true
  }
);

module.exports = OTP;