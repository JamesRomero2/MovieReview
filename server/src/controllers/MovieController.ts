import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import MovieModel from "../models/movie";

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
    .then((movie) => res.status(201).json({movie}))
    .catch((error) => res.status(500).json({ error }));
};

const readMovie = (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;

  return MovieModel.findById(movieId)
    .then((movie) => (movie ? res.status(200).json({ movie }) : res.status(404).json({ message: 'Movie Not Found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAllMovie = (req: Request, res: Response, next: NextFunction) => {
  return MovieModel.find()
    .then((movie) => {res.status(200).json({ movie });
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateMovie = (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;

  return MovieModel.findById(movieId)
    .then((movie) => {
      if (movie) {
        movie.set(req.body);

        return movie
          .save()
          .then((movie) => res.status(201).json({ movie }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Movie Not Found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteMovie = (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;

  return MovieModel.findByIdAndDelete(movieId)
    .then((movie) => (movie ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Movie Not Found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createMovie,
  readAllMovie,
  readMovie,
  updateMovie,
  deleteMovie
};