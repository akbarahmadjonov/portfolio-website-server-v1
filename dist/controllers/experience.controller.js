"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperience = exports.getAllExperience = void 0;
const experience_model_1 = __importDefault(require("../models/experience.model"));
const uuid_1 = require("uuid");
// GET all experience records
const getAllExperience = async (req, res) => {
    try {
        // GET all experience records from the database
        const experience = await experience_model_1.default.find();
        return res.status(200).json(experience);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllExperience = getAllExperience;
// POST a new experience record with image upload
const createExperience = async (req, res) => {
    try {
        const { place, date, linkWeb, website, summary } = req.body;
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const imageFile = req.files.image;
        // Generate a unique filename using uuid
        const imageName = `${(0, uuid_1.v4)()}.${imageFile.mimetype.split("/")[1]}`;
        // Specify the directory where you want to store experience images
        const imageDir = `${process.cwd()}/uploads/`; // Adjust the path as needed
        // Move the image file to the specified directory
        imageFile.mv(`${imageDir}${imageName}`, async (err) => {
            if (err) {
                console.error("Error saving image:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            // Create a new experience document with the image filename
            const newExperience = new experience_model_1.default({
                image: `${imageName}`,
                place,
                date,
                linkWeb,
                website,
                summary,
            });
            // Save the new experience document to the database
            await newExperience.save();
            return res.status(201).json(newExperience); // Return the newly created experience document
        });
    }
    catch (error) {
        console.error("Error creating experience record:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createExperience = createExperience;
