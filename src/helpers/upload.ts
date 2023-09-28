// CLOUDINARY
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (file: string): Promise<UploadApiResponse> => {
  const image = await cloudinary.uploader.upload(file, (result) => result);
  return image;
};
