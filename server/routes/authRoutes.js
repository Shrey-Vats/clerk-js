import e from 'express';
import { Login, Logout, Signup, tokenverify } from '../controllers/authController.js';

const authRouter = e.Router();

authRouter.post('/login', Login);
authRouter.post('/signup', Signup);
authRouter.post("/logout", Logout);

authRouter.get("/tokenverify", tokenverify)

export default authRouter;
