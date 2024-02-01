export default async (req, res) => {
  if (req.method === 'POST') {
      const code = req.body.code;
      const codeVerifier = req.body.codeVerifier; // Make sure to send this from the client
      const redirectUrl = process.env.MAL_REDIRECT_URL;

      try {
          const tokenResponse = await fetch('https://myanimelist.net/v1/oauth2/token', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({
                  client_id: process.env.MAL_CLIENT_ID,
                  grant_type: 'authorization_code',
                  code: code,
                  redirect_url: redirectUrl,
                  code_verifier: codeVerifier
              })
          });

          const data = await tokenResponse.json();
          res.status(200).json(data);
      } catch (error) {
          res.status(500).json({ error: 'Failed to exchange authorization code for tokens' });
      }
  } else {
      res.status(405).json({ error: 'Method not allowed' });
  }
};
