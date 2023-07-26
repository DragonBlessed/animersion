export default async (req, res) => {
    try {
      const response = await fetch('https://api.myanimelist.net/v2/anime/ranking', {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID,
        },
        params: {
          ranking_type: 'favorite',
          limit: 5,
        },
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from MyAnimeList' });
    }
  };
  