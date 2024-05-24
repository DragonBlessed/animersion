import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import saveQuizAnswersRouter from './saveQuizAnswers.js';
import userAnimelistRouter from './userAnimelist.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


connectToDatabase().then(() => {
  app.use('/api/jikan', require('./jikan.js'));
  app.use('/api/mal', require('./mal.js'));
  app.use('/api/saveQuizAnswers', saveQuizAnswersRouter);
  app.use('/api/user-animelist', userAnimelistRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
