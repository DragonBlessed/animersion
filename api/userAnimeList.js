const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.myanimelist.net/v2/users/${username}/animelist`, {
      headers: {
        'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID
      },
      params: {
        status: 'completed',
        limit: 100
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user anime list:', error);
    res.status(500).json({ message: 'Failed to fetch user anime list', details: error.message });
  }
});

export default router;