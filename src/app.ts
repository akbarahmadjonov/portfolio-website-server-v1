import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import apiRoutes from "./routes/api.routes";
import fileUpload from "express-fileupload";

const app = express();

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(process.cwd() + "/uploads"));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json());

// CONNECT TO THE DATABASE
connectDB();

// API ROUTES
app.use("/api", apiRoutes);

export default app;
