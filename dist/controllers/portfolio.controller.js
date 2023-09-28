"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPortfolio = exports.getAllPortfolio = void 0;
const portfolio_model_1 = __importDefault(require("../models/portfolio.model"));
const uuid_1 = require("uuid");
// GET all portfolio records
const getAllPortfolio = async (req, res) => {
    try {
        // GET all portfolio records from the database
        const portfolio = await portfolio_model_1.default.find();
        return res.status(200).json(portfolio);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllPortfolio = getAllPortfolio;
// POST a new portfolio record with image upload
const createPortfolio = async (req, res) => {
    try {
        const { place, date, linkWeb, website, summary, skills } = req.body;
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const imageFile = req.files.image;
        // Generate a unique filename using uuid
        const imageName = `${(0, uuid_1.v4)()}.${imageFile.mimetype.split("/")[1]}`;
        // Specify the directory where you want to store portfolio images
        const imageDir = `${process.cwd()}/uploads/`; // Adjust the path as needed
        // Move the image file to the specified directory
        imageFile.mv(`${imageDir}${imageName}`, async (err) => {
            if (err) {
                console.error("Error saving image:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            // Create a new portfolio document with the image filename
            const newPortfolio = new portfolio_model_1.default({
                image: `${imageName}`,
                place,
                date,
                linkWeb,
                website,
                summary,
                skills
            });
            // Save the new portfolio document to the database
            await newPortfolio.save();
            return res.status(201).json(newPortfolio); // Return the newly created portfolio document
        });
    }
    catch (error) {
        console.error("Error creating portfolio record:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createPortfolio = createPortfolio;
