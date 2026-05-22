const User = require("./user.model");
const OTP = require("./otp.model");
const Wallet = require("./wallet.model");
const Transaction = require("./transaction.model");
const KYC = require("./kyc.model");

User.hasMany(OTP, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

OTP.belongsTo(User, {
  foreignKey: "user_id"
});

User.hasOne(Wallet, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Wallet.belongsTo(User, {
  foreignKey: "user_id"
});

Wallet.hasMany(Transaction, {
  foreignKey: "wallet_id",
  onDelete: "CASCADE"
});

Transaction.belongsTo(Wallet, {
  foreignKey: "wallet_id"
});

User.hasOne(KYC, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

KYC.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = {
  User,
  OTP,
  Wallet,
  Transaction,
  KYC
};