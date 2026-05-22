const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    balance: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    },

    winnings: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    },

    deposit_balance: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0
    }
  },
  {
    tableName: "wallets",
    timestamps: true,
    underscored: true
  }
);

module.exports = Wallet;