import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/database";
import apiRoutes from "./routes/api.routes";
import fileUpload from "express-fileupload";

const app = express();

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd()));
app.use(bodyParser.json());
app.use(fileUpload());

// CONNECT TO THE DATABASE
connectDB();

// API ROUTES
app.use("/api", apiRoutes);

export default app;
