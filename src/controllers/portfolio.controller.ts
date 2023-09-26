import { Request, Response } from "express";
import PortfolioModel, { Portfolio } from "../models/portfolio.model";
import { v4 as uuidv4 } from "uuid";
import fileUpload, { UploadedFile } from "express-fileupload";

// GET all portfolio records
export const getAllPortfolio = async (req: Request, res: Response) => {
  try {
    // GET all portfolio records from the database
    const portfolio = await PortfolioModel.find();
    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// POST a new portfolio record with image upload
export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const { place, date, linkWeb, website, summary } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFile = req.files.image as UploadedFile;

    // Generate a unique filename using uuid
    const imageName = `${uuidv4()}.${imageFile.mimetype.split("/")[1]}`;

    // Specify the directory where you want to store portfolio images
    const imageDir = `${process.cwd()}/uploads/`; // Adjust the path as needed

    // Move the image file to the specified directory
    imageFile.mv(`${imageDir}${imageName}`, async (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Create a new portfolio document with the image filename
      const newPortfolio: Portfolio = new PortfolioModel({
        image: `${imageName}`, // Store the image path in the database
        place,
        date,
        linkWeb,
        website,
        summary,
      });

      // Save the new portfolio document to the database
      await newPortfolio.save();

      return res.status(201).json(newPortfolio); // Return the newly created portfolio document
    });
  } catch (error) {
    console.error("Error creating portfolio record:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
