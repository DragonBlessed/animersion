export default async (req, res) => {
    if (req.method === 'GET') {
      const clientID = process.env.MAL_CLIENT_ID; 
      const url = `https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=10`;
  
      try {
        const animeResponse = await fetch(url, {
          headers: {
            'X-MAL-CLIENT-ID': clientID,
          },
        });
  
        if (!animeResponse.ok) {
          throw new Error('Failed to fetch anime data');
        }
  
        const animeData = await animeResponse.json();
        res.status(200).json(animeData);
      } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ error: error.message });
      }
    } else {
      // Handle other methods
      res.status(405).json({ error: 'Method not allowed' });
    }
  };