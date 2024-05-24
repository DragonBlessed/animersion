import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import saveQuizAnswersRouter from './saveQuizAnswers.js';
import userAnimelistRouter from './userAnimelist.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectToDatabase = async () => {
  try {
    const mongoDBUsername = process.env.MONGO_DB_USERNAME;
    const mongoDBPassword = process.env.MONGO_DB_PASSWORD;
    const mongoUri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@animersion.vhua5vh.mongodb.net/?retryWrites=true&w=majority&appName=animersion`;

    console.log("MongoDB URI: ", mongoUri);

    const client = new MongoClient(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    console.log("Connected successfully to server");
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
};

connectToDatabase().then(() => {
  import(path.join(__dirname, './jikan.js')).then(module => app.use('/api/jikan', module.default));
  import(path.join(__dirname, './mal.js')).then(module => app.use('/api/mal', module.default));
  app.use('/api/saveQuizAnswers', saveQuizAnswersRouter);
  app.use('/api/user-animelist', userAnimelistRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
