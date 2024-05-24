import express from 'express';
const router = express.Router();
import { connectToDatabase } from './db.js';
const QuizResult = require('./models/quizResults.js');
import saveQuizAnswersRouter from './saveQuizAnswers.js';
import userAnimelistRouter from './userAnimelist.js';

const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

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
