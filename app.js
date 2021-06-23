import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import authRoutes from "./routes/userRoute.js";
import connectDb from "./db.js";
import { errorController } from "./controllers/errorController.js";
dotenv.config();
const app = express();
app.use(express.json());
connectDb();
app.use("/api/v1/auth", authRoutes);
app.use(errorController);
export default app;
// global error handeling --done
// validate email id  --done
// password or any field not present --done
// swagger --done
// jest - testing  framework --bit left
// Logs in app
