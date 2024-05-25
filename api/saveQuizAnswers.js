import express from 'express';
import { QuizResult } from './models/quizResults.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, quizAnswers } = req.body;
    const newQuizResult = new QuizResult({
      username,
      quizAnswers
    });
    await newQuizResult.save();
    res.status(201).json({ message: 'Quiz answers saved successfully' });
  } catch (error) {
    console.error('Failed to save quiz answers:', error);
    res.status(500).json({ error: 'Failed to save quiz answers' });
  }
});

export default router;