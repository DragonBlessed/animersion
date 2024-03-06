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
    } else if (req.method === 'POST') {
      const { code, codeVerifier } = req.body;
      const tokenEndpoint = 'https://myanimelist.net/v1/oauth2/token';
      const client_id = process.env.MAL_CLIENT_ID;
      const redirect_uri = process.env.MAL_REDIRECT_URL;
    
      const params = new URLSearchParams();
      params.append('client_id', client_id);
      params.append('code', code);
      params.append('code_verifier', codeVerifier);
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', redirect_uri);
    
      try {
        const response = await fetch(tokenEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params,
        });
    
        if (!response.ok) {
          throw new Error(`Token exchange failed: ${response.statusText}`);
        }
    
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error('Token exchange error:', error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  };