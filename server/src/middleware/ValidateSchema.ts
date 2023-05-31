import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { IMovie } from "../models/movie";
import { IReview } from "../models/review";

export const ValidateSchemas = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({error});
    }
  };
};

export const Schemas = {
  movie: {
    create: Joi.object<IMovie>({
      imdbId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      title: Joi.string(),
      releaseDate: Joi.string(),
      trailerLink: Joi.string(),
      poster: Joi.string(),
      genres: Joi.array().items(Joi.string()),
      backdrops: Joi.array().items(Joi.string()),
    }),
    update: Joi.object<IMovie>({
      imdbId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      title: Joi.string(),
      releaseDate: Joi.string(),
      trailerLink: Joi.string(),
      poster: Joi.string(),
      genres: Joi.array().items(Joi.string()),
      backdrops: Joi.array().items(Joi.string()),
    })
  },
  review: {
    create: Joi.object<IReview>({
      name: Joi.string().required(),
      comment: Joi.string().required(),
      imdbId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    update: Joi.object<IReview>({
      name: Joi.string().required(),
      comment: Joi.string().required(),
      imdbId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }
};