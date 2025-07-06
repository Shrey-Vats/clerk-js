import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
  verifyType: {
    type: String,
    enum: ["emailVerify", "resetPassword"],
  },
  emailVerified: {type: Boolean, default: false},
});

const User = mongoose.model('auth', UserSchema)

export default User