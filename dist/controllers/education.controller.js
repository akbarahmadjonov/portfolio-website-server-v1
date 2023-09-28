"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEducation = exports.getAllEducation = void 0;
const education_model_1 = __importDefault(require("../models/education.model"));
const uuid_1 = require("uuid");
// import { upload } from "./helpers/cloudinary.ts";
// const cloudFile = await upload(imageFile.tempFilePath);
// console.log(cloudFile);
// GET all education records
const getAllEducation = async (req, res) => {
    try {
        // GET all education records from the database
        const education = await education_model_1.default.find();
        return res.status(200).json(education);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllEducation = getAllEducation;
// POST a new education record with image upload
const createEducation = async (req, res) => {
    try {
        const { place, date, linkWeb, website, summary } = req.body;
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const imageFile = req.files.image;
        // Generate a unique filename using uuid
        const imageName = `${(0, uuid_1.v4)()}.${imageFile.mimetype.split("/")[1]}`;
        // Specify the directory where you want to store education images
        const imageDir = `${process.cwd()}/uploads/`; // Adjust the path as needed
        // Move the image file to the specified directory
        imageFile.mv(`${imageDir}${imageName}`, async (err) => {
            if (err) {
                console.error("Error saving image:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            // Create a new education document with the image filename
            const newEducation = new education_model_1.default({
                image: `${imageName}`,
                place,
                date,
                linkWeb,
                website,
                summary,
            });
            // Save the new education document to the database
            await newEducation.save();
            return res.status(201).json(newEducation); // Return the newly created education document
        });
    }
    catch (error) {
        console.error("Error creating education record:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createEducation = createEducation;
