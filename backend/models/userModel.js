import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  profilePic: {
    type: String,
    default: ""
  },

  profilePicPublicId: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  address: {
    type: String
  },

  city: {
    type: String
  },

  zipcode: {
    type: String
  },

  phoneNo: {
    type: String
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;