import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ReviewModel from "../models/review";

const createReview = (req: Request, res: Response, next: NextFunction) => {
  const { name, comment, imdbId } = req.body;

  const review = new ReviewModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    comment,
    imdbId
  });

  return review
    .save()
    .then((review) => res.status(201).json({review}))
    .catch((error) => res.status(500).json({ error }));
};

const readReview = (req: Request, res: Response, next: NextFunction) => {
  const reviewId = req.params.reviewId;

  return ReviewModel.findById(reviewId)
    .then((review) => (review ? res.status(200).json({ review }) : res.status(404).json({ message: 'Review Not Found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAllReview = (req: Request, res: Response, next: NextFunction) => {
  return ReviewModel.find()
    .then((review) => res.status(200).json({ review }))
    .catch((error) => res.status(500).json({ error }));
};

const updateReview = (req: Request, res: Response, next: NextFunction) => {
  const reviewId = req.params.reviewId;

  return ReviewModel.findById(reviewId)
    .then((review) => {
      if (review) {
        review.set(req.body);

        return review
          .save()
          .then((review) => res.status(201).json({ review }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Review Not Found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteReview = (req: Request, res: Response, next: NextFunction) => {
  const reviewId = req.params.reviewId;

  return ReviewModel.findByIdAndDelete(reviewId)
    .then((review) => (review ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Review Not Found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createReview,
  readAllReview,
  readReview,
  updateReview,
  deleteReview
};