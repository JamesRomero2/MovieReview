import mongoose, { Document, Schema } from "mongoose";

export interface IMovie {
  imdbId: string,
  title: string,
  releaseDate: string,
  trailerLink: string,
  poster: string,
  genres: string[],
  backdrops: string[]
}

export interface IMovieModel extends IMovie, Document {}

const MovieSchema: Schema = new Schema(
  {
    imdbId: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    releaseDate: {
      type: String
    },
    trailerLink: {
      type: String
    },
    poster: {
      type: String
    },
    genres: {
      type: [String]
    },
    backdrops: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMovieModel>('Movie', MovieSchema);