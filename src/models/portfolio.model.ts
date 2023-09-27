import mongoose, { Schema, Document } from "mongoose";

export interface Portfolio extends Document {
  image: string;
  place: string;
  date: string;
  linkWeb: string;
  website: string;
  summary: string;
  skills: string[];
}

const PortfolioSchema: Schema = new Schema({
  image: { type: String },
  place: { type: String },
  date: { type: String },
  linkWeb: { type: String },
  website: { type: String },
  summary: { type: String },
  skills: [{ type: String }],
});

const PortfolioModel = mongoose.model<Portfolio>("Portfolio", PortfolioSchema);

export default PortfolioModel;
