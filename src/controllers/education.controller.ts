import { Request, Response } from "express";
import EducationModel, { Education } from "../models/education.model";
import { v4 as uuidv4 } from "uuid";
import fileUpload, { UploadedFile } from "express-fileupload";

// CLOUDINARY
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcvfn6wyd",
  api_key: "839851812962957",
  api_secret: "KiU0eiI3zFUp4VfRz7fp87wurbk",
});

// GET all education records
export const getAllEducation = async (req: Request, res: Response) => {
  try {
    // GET all education records from the database
    const education = await EducationModel.find();
    return res.status(200).json(education);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// POST a new education record with image upload
export const createEducation = async (req: Request, res: Response) => {
  try {
    const { place, date, linkWeb, website, summary } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const imageFile = req.files.image as UploadedFile;

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(
      imageFile.tempFilePath,
      async (error, result) => {
        if (error) {
          console.error("Error uploading image to Cloudinary:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!result) {
          console.error("Cloudinary result is undefined");
          return res.status(500).json({ error: "Internal Server Error" });
        }

        // Create a new education document with the Cloudinary image URL
        const newEducation: Education = new EducationModel({
          image: result.secure_url, // Store the Cloudinary image URL in the database
          place,
          date,
          linkWeb,
          website,
          summary,
        });

        // Save the new education document to the database
        await newEducation.save();

        return res.status(201).json(newEducation); // Return the newly created education document
      }
    );
  } catch (error) {
    console.error("Error creating education record:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
