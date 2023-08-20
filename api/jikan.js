import axios from 'axios';

let cache = {};
let cacheTimestamp = null;

export default async (req, res) => {
  try {
    // Check if the cache is still valid
    if (cacheTimestamp && Date.now() - cacheTimestamp < 10 * 60 * 1000) {
      return res.status(200).json(cache);
    }

    // Fetching the top anime by airing
    const airingResponse = await axios.get('https://api.jikan.moe/v4/top/anime', {
      params: {
        filter: 'airing',
      },
    });
    const mostAiringAnimeId = airingResponse.data.data[0].mal_id;

    // Fetching the news related to the most aired anime
    const newsResponse = await axios.get(`https://api.jikan.moe/v4/anime/${mostAiringAnimeId}/news`);
    const newsData = newsResponse.data.data;

    res.status(200).json(newsData);

    // Update the cache
    cache = newsData;
    cacheTimestamp = Date.now();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Failed to fetch anime news' });
  }
};
