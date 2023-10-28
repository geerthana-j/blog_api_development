import express from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
import { MongoClient} from 'mongodb';
import postRoutes from './routes/postRoutes';

const app = express();


app.use(bodyParser.json());

const mongoUri = "mongodb+srv://geerthikumar:f3rk02JZjpHfJ3z4@cluster0.3o1mx9f.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoUri);
const post_collection 

app.use('/api/posts', postRoutes);










export default app;
