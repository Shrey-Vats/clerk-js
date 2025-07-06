import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { signAccessToken } from '../services/jwtService.js';

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

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).json({
            message: "User no longer exit, Signup first",
            success: false,
          });
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid Password, Try again",
            success: false,
          });
        }

        const token = signAccessToken({
          userId: user._id,
          email: email,
          role: user.role,
        });
        
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000 * 29,
        });

        return res.status(200).json({
          message: "Login successfuly",
          success: true,
        });
    } catch (error) {
        return res.status(500).json({
          message: "Something went wrong, Try again",
        });
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
          message: "Logout successfuly",
          success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
          message: "Something went wrong, Try again",
        });
    }
}