import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './src/config';
import { default as movieRoutes, default as reviewRoutes } from './src/routes/MovieRoutes';

const app : Express = express();

app.use(cors({
  credentials: true,
}));


mongoose.Promise = Promise;
mongoose.connect(config.mongo.url)
  .then(() => {
    console.log(`MONGO DB CONNECTED, STARTING SERVER ON PORT ${config.server.port}`);
    startServer();
  }).catch((error: Error) => console.log(error));


const startServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`INCOMMING -> METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      console.log(`INCOMMING -> METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${req.statusCode}]`);
    });

    next();
  });

  // BODY PARSER
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(compression());
  // app.use(cookieParser());

  // RULES OF API
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  // ROUTES
  // TODO: CREATE ROUTES
  app.use('/movie', movieRoutes);
  app.use('/review', reviewRoutes);

  // HEALTH CHECK
  app.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({message: 'pong'}));

  // ERROR HANDLING
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    console.log(error);

    return res.status(404).json({message: error.message});
  });

  http.createServer(app).listen(process.env.PORT, () => {
    console.log("SERVER RUNNING ON PORT " + config.server.port);
  });

};