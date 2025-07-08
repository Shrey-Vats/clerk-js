import e from 'express'
import cors from 'cors'
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config()
const app = e()

app.use(e.json());
app.use(cors(
    {
        origin: ['http://localhost:5174', 'http://localhost:5173'   ],
        credentials: true
    }
))

app.use("/api", authRouter)

export default app