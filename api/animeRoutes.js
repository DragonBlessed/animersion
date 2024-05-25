const express = require('express');
const axios = require('axios');
import express from 'express';
const router = express.Router();

router.get('/top-anime', async (req, res) => {
  try {
    const response = await axios.get('https://api.myanimelist.net/v2/anime/ranking', {
      headers: { 'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID },
      params: { ranking_type: 'all', limit: 10 }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top anime:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
