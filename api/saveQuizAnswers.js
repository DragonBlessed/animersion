import express from 'express';
import QuizResult from './models/QuizResult.js'; 

const router = express.Router();

router.post('/saveQuizAnswers', async (req, res) => {
  const { username, quizAnswers } = req.body;
  try {
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
