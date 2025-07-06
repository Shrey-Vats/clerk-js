import bcrypt from "bcryptjs";
import User from '../models/user';


export const generateToken = async (userId, type) =>{
    try {
        const user = await User.findById(userId);
        const token = await bcrypt.hash(user._id.toString(), 10);
        const tokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

        user.verifyToken = token;
        user.verifyTokenExpiry = tokenExpiry;
        user.verifyType = type;

        await user.save();

        return token;
    } catch (error) {
       console.log(error)
       return null 
    }
}

export const verifyToken = async (token, type) =>{
    
   try {
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
      verifyType: type,
    });

    if (!user) {
      console.log("Token is not valid");
      return null;
    }

    user.role = "user";
    await user.save();

    return user;
   } catch (error) {
    console.log(error);
    return null
   }
}