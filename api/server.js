import express from 'express';
const router = express.Router();
import { connectToDatabase } from './db.js';
const QuizResult = require('./models/quizResults.js');


const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();


router.post('/saveQuizAnswers', async (req, res) => {
  try {
    const { username, quizAnswers } = req.body;
    const newQuizResult = new QuizResult({
      username,
      quizAnswers
    });
    await newQuizResult.save();
    res.status(201).send('Quiz answers saved successfully');
  } catch (error) {
    console.error('Failed to save quiz answers:', error);
    res.status(500).json({ message: 'Failed to save quiz answers', details: error.message });
  }
});

connectToDatabase().then(() => {
  app.use(cors());
  app.use(express.json());

  const port = process.env.PORT || 3000;

  app.use('/api/jikan', require('./jikan.js'));
  app.use('/api/mal', require('./mal.js'));
  app.use('/api/save', require('./saveQuizAnswers.js'));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
