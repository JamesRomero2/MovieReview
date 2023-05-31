import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import MovieModel, { IMovieModel } from "../models/Movie";

const createMovie = (req: Request, res: Response, next: NextFunction) => {
  const {
    imdbId, 
    title, 
    releaseDate, 
    trailerLink, 
    poster, 
    genres, 
    backdrops
  } = req.body;

  const movie = new MovieModel({
    _id: new mongoose.Types.ObjectId(),
    imdbId,
    title,
    releaseDate, 
    trailerLink, 
    poster, 
    genres, 
    backdrops
  });

  return movie
    .save()
    .then((movie : IMovieModel) => res.status(201).json({movie}))
    .catch((error : Error) => res.status(500).json({ error }));
};

const readMovie = (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;

  return MovieModel.findById(movieId)
    .then((movie: IMovieModel | null) => (movie ? res.status(200).json({ movie }) : res.status(404).json({ message: 'Movie Not Found' })))
    .catch((error : Error) => res.status(500).json({ error }));
};

const readAllMovie = (req: Request, res: Response, next: NextFunction) => {
  return MovieModel.find()
    .then((movie : IMovieModel[] ) => res.status(200).json({ movie }))
    .catch((error : Error) => res.status(500).json({ error }));
};

const updateMovie = (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;

  return MovieModel.findById(movieId)
    .then((movie: IMovieModel | null) => {
      if (movie) {
        movie.set(req.body);

        return movie
          .save()
          .then((movie) => res.status(201).json({ movie }))
          .catch((error : Error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Movie Not Found' });
      }
    })
    .catch((error : Error) => res.status(500).json({ error }));
};

const deleteMovie = (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;

  return MovieModel.findByIdAndDelete(movieId)
    .then((movie: IMovieModel | null) => (movie ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Movie Not Found' })))
    .catch((error : Error) => res.status(500).json({ error }));
};

export default {
  createMovie,
  readAllMovie,
  readMovie,
  updateMovie,
  deleteMovie
};