import mongoose, { Schema, Document } from "mongoose";

export interface Education extends Document {
  image: string;
  place: string;
  date: string;
  linkWeb: string;
  website: string;
  summary: string;
}

const EducationSchema: Schema = new Schema({
  image: { type: String },
  place: { type: String },
  date: { type: String },
  linkWeb: { type: String },
  website: { type: String },
  summary: { type: String },
});

const EducationModel = mongoose.model<Education>("Education", EducationSchema);

export default EducationModel;
