import bcrypt from "bcryptjs";
import User from '../models/user.js';


export const generateToken = async (userId, type) =>{
    try {
      console.log(userId);
        const user = await User.findById(userId);
        const token = await bcrypt.hash(user._id.toString(), 10);
        const tokenExpiry = await Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

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
  console.log(token); 
   try {
  
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
      verifyType: type,
    });

    console.log(user)

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

export const clearToken = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, {
        $unset: {
            verifyToken: '',
            verifyTokenExpiry: '',
            verifyType: ''
        }
    })
  } catch (error) {
    console.log(error);
  }
}