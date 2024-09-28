const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("💾 connected successfully");
  })
  .catch((error) => {
    console.log("Error in connecting to 💾:", error);
  });

//------------------------------userSchema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 30,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 11,
    maxLength: 30,
    trim: true,
    lowercase: true,
  },
  password_hash: {
    type: String,
    required: true,
    minLength: 6,
  },
});

//---------------------bank related schemas
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

//methods to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPassword) {
  //hashing user's salth and password with 10 iterations,
  const saltRounds = 10;

  //first method to generate a salt and then create hash
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};

// validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password_hash);
};

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { User, Account };
