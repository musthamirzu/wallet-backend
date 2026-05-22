const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    reference_id: {
      type: DataTypes.STRING,
      unique: true
    },

    type: {
      type: DataTypes.ENUM(
        "CREDIT",
        "DEBIT",
        "WITHDRAW",
        "BONUS",
        "REFUND"
      ),
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "SUCCESS",
        "FAILED"
      ),
      defaultValue: "SUCCESS"
    },

    description: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: "transactions",
    timestamps: true,
    underscored: true
  }
);

module.exports = Transaction;