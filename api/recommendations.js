import express from 'express';
import axios from 'axios';
import { QuizResult } from './models/quizResults.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, quizAnswers } = req.body;

    // Save quiz answers to the database
    const newQuizResult = new QuizResult({
      username,
      quizAnswers
    });
    await newQuizResult.save();

    // Fetch recommendations from MAL based on the quiz answers and username
    const response = await axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist`, {
      headers: {
        'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID
      },
      params: {
        status: 'completed',
        limit: 100
      }
    });

    // Process the response to generate recommendations
    const recommendations = response.data.data.map(anime => ({
      id: anime.node.id,
      title: anime.node.title,
      image: anime.node.main_picture.large
    }));

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

export default router;