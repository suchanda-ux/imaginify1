import { transformationTypes } from "@/constants";
import { model, Model, models, Schema } from "mongoose";
import { title } from "process";

import { ObjectId } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: URL;
  width?: string;
  height?: string;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string
    firstName:string;
    lastName:String;
  }
  createdAt: Date;
  updatedAt: Date;
}
const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureURL: { type: URL, required: true },
  width: { type: String },
  height: { type: String},
  config: { type: Object},
  transformationUrl: { type: URL },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;
