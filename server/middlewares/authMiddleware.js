import jwt from 'jsonwebtoken'
import User from '../models/user';
import { verifyAccessToken } from '../services/jwtService';

export const authMiddleware = async (req, res, next) => {
   try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        message: "Unauthorize, plz Login first",
        success: false,
      });
    }

    const Decoeded = verifyAccessToken(token);

    const user = await User.findById(Decoeded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    req.user = user;
    next();
   } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, Try again",
      success: false
    });
   }
}