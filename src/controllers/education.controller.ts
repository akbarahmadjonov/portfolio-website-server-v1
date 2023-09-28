import { Request, Response } from "express";
import EducationModel, { Education } from "../models/education.model";
import { v4 as uuidv4 } from "uuid";
import fileUpload, { UploadedFile } from "express-fileupload";
// import { upload } from "./helpers/cloudinary.ts";
// const cloudFile = await upload(imageFile.tempFilePath);
// console.log(cloudFile);

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

    // Generate a unique filename using uuid
    const imageName = `${uuidv4()}.${imageFile.mimetype.split("/")[1]}`;

    // Specify the directory where you want to store education images
    const imageDir = `${process.cwd()}/uploads/`; // Adjust the path as needed

    // Move the image file to the specified directory
    imageFile.mv(`${imageDir}${imageName}`, async (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Create a new education document with the image filename
      const newEducation: Education = new EducationModel({
        image: `${imageName}`, // Store the image path in the database
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
  } catch (error) {
    console.error("Error creating education record:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
