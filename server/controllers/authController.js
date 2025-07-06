import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

export const Signup = async (req, res) => {
   try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "User with this email already exit",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    await User.create({ email, password: hashedPassword });

    return res.status(200).json({
      message: "Signup Successfuly",
      success: true,
    });
   } catch (error) {
    return res.status(500).json({
        message: "Something went wrong, Try again"
    })
   }
}