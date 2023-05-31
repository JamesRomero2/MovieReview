import mongoose, { Document, Schema } from "mongoose";

export interface IReview {
  name: string,
  comment: string,
  imdbId: string
}

export interface IReviewModel extends IReview, Document {}

const ReviewSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    imdbId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Movie'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IReviewModel>('Review', ReviewSchema);