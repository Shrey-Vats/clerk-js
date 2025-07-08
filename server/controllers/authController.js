import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { signAccessToken } from '../services/jwtService.js';
import {
  generateToken,
  verifyToken,
  clearToken,
} from "../services/tokenService.js";
import {sendEmail} from '../services/emailService.js'

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
    const newUser = await User.create({ email, password: hashedPassword });


    const token = await generateToken(newUser._id, "emailVerify");
    console.log(token);
    const link = `http://localhost:5173/verify?token=${token}`;
    console.log(link);

    await sendEmail({
      to: email,
      subject: "Verify your account",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
    <h2 style="color: #333;">Verify Your Email</h2>
    <p>Hello,</p>
    <p>Please verify your email address by clicking the button below.</p>
    <a
      href="${link}"
      style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;"
    >Verify Email</a>
    <p style="margin-top: 20px; font-size: 12px; color: #666;">
      If you didn't request this, you can safely ignore this email.
    </p>
  </div>`,
    });

    return res.status(200).json({
      message: "OTP sended",
      success: true,
    });
   } catch (error) {
    console.log(error);
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
          return res.status(401).json({
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

export const tokenverify = async (req, res)=> {
    try {
        const token = req.query.token

        console.log(token);
        const user = await verifyToken(token, "emailVerify");
    
        console.log(user);
        if (!user) {
          return res.status(400).json({
            message: "Token is not valid, Try again",
            success: false,
          });
        }
    
        user.emailVerified = true;
        await user.save();
        
        await clearToken(user._id);
    
        return res.status(200).json({
          message: "Token is valid, You can now login",
          success: true,
        });
    } catch (error) {
        return res.status(500).json({
          message: "Something went wrong, Try again",
        });
    }
}