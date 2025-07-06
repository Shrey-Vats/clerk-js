import bcrypt from "bcryptjs";
import User from '../models/user';


export const generateToken = async (userId, type) =>{

    const user = await User.findById(userId)
    const token = await bcrypt.hash(user._id.toString(), 10)
    const tokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

    user.verifyToken = token;
    user.verifyTokenExpiry = tokenExpiry;
    user.verifyType = type;

    await user.save();

    return token
}