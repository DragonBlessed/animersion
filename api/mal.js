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
      const clientId = process.env.MAL_CLIENT_ID;
      const redirectUri = process.env.MAL_REDIRECT_URL;
    
      const params = new URLSearchParams();
      params.append('client_id', clientId);
      params.append('code', code);
      params.append('code_verifier', codeVerifier);
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', redirectUri);
    
      try {
        const tokenResponse = await fetch('https://myanimelist.net/v1/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
  
        if (!tokenResponse.ok) {
          throw new Error(`Token exchange failed with status: ${tokenResponse.status}`);
        }
  
        const data = await tokenResponse.json();
        res.status(200).json(data);
      } catch (error) {
        console.error('Token exchange error:', error);
        res.status(500).json({ error: 'Token exchange failed', details: error.message });
      }
    } else {
      // Handle other methods
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  };