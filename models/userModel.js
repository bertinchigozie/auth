const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"]
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide your password"]
  }
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hashSync(this.password, 12);
  next();
});
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
