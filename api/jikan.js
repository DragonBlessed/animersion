import axios from 'axios';

export default async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch anime news' });
  }
};