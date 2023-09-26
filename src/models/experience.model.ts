import mongoose, { Schema, Document } from "mongoose";

export interface Experience extends Document {
  image: string;
  place: string;
  date: string;
  linkWeb: string;
  website: string;
  summary: string;
}

const ExperienceSchema: Schema = new Schema({
  image: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  linkWeb: { type: String, required: true },
  website: { type: String, required: true },
  summary: { type: String, required: true },
});

const ExperienceModel = mongoose.model<Experience>(
  "Experience",
  ExperienceSchema
);

export default ExperienceModel;
