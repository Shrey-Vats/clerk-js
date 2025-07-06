import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, enum:["admin", "user"], default: "user"}
})

const User = mongoose.model('auth', UserSchema)

export default User