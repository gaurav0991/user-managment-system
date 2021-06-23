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

app.listen(3000, console.log(`Sever running on PORT 3000 `.blue.bold));
