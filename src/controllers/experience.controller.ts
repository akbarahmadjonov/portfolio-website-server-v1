import { Request, Response } from "express";
import ExperienceModel, { Experience } from "../models/experience.model";
import { v4 as uuidv4 } from "uuid";
import fileUpload, { UploadedFile } from "express-fileupload";

// GET all experience records
export const getAllExperience = async (req: Request, res: Response) => {
  try {
    // GET all experience records from the database
    const experience = await ExperienceModel.find();
    return res.status(200).json(experience);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// POST a new experience record with image upload
export const createExperience = async (req: Request, res: Response) => {
  try {
    const { place, date, linkWeb, website, summary } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFile = req.files.image as UploadedFile;

    // Generate a unique filename using uuid
    const imageName = `${uuidv4()}.${imageFile.mimetype.split("/")[1]}`;

    // Specify the directory where you want to store experience images
    const imageDir = `${process.cwd()}/uploads/`; // Adjust the path as needed

    // Move the image file to the specified directory
    imageFile.mv(`${imageDir}${imageName}`, async (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Create a new experience document with the image filename
      const newExperience: Experience = new ExperienceModel({
        image: `${imageName}`, // Store the image path in the database
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
  } catch (error) {
    console.error("Error creating experience record:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
