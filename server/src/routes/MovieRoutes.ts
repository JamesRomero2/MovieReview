import express, { Express } from "express";
import MovieController from "../controllers/MovieController";
import { Schemas, ValidateSchemas } from "../middleware/ValidateSchema";

const app: Express = express();

app.get('/get/:movieId', MovieController.readMovie);
app.get('/get/', MovieController.readAllMovie);
app.post('/create', ValidateSchemas(Schemas.movie.create), MovieController.createMovie);
app.patch('/update/:movieId', ValidateSchemas(Schemas.movie.update), MovieController.updateMovie);
app.delete('/delete/:movieId', MovieController.deleteMovie);

export = app