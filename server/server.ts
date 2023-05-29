import express from 'express';
import http from 'http';
import mongoose, { mongo } from 'mongoose';
import {config} from './src/config'

const app = express();

mongoose.connect(config.mongo.url, {retryWrites: true, w : 'majority'})
  .then(() => {console.log('MONGO DATABASE CONNECTED')})
  .catch((error) => {console.log(error)});