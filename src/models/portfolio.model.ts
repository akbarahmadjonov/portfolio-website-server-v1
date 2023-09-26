import mongoose, { Schema, Document } from "mongoose";

export interface Portfolio extends Document {
  image: string;
  place: string;
  date: string;
  linkWeb: string;
  website: string;
  summary: string;
}

const PortfolioSchema: Schema = new Schema({
  image: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: String, required: true },
  linkWeb: { type: String, required: true },
  website: { type: String, required: true },
  summary: { type: String, required: true },
});

const PortfolioModel = mongoose.model<Portfolio>("Portfolio", PortfolioSchema);

export default PortfolioModel;
