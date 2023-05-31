import express, { Express } from "express";
import ReviewController from "../controllers/ReviewController";
import { Schemas, ValidateSchemas } from "../middleware/ValidateSchema";

const app: Express = express();

app.get('/get/:reviewId', ReviewController.readReview);
app.get('/get/', ReviewController.readAllReview);
app.post('/create', ValidateSchemas(Schemas.review.create), ReviewController.createReview);
app.patch('/update/:reviewId', ValidateSchemas(Schemas.review.update), ReviewController.updateReview);
app.delete('/delete/:reviewId', ReviewController.deleteReview);

export = app