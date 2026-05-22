const { User } = require("../models");

const updateProfile = async (
  userId,
  data
) => {

  const user = await User.findByPk(
    userId
  );

  if (!user) {
    throw new Error("User not found");
  }

  if (data.name) {
    user.name = data.name;
  }

  await user.save();

  return user;
};

module.exports = {
  updateProfile
};