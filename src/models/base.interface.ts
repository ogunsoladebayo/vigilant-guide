import { Types } from "mongoose";

export interface BaseInterface {
  _id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}
