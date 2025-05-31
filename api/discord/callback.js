export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  // Remplace par tes vraies infos
  const CLIENT_ID = '1286063146599190558';
  const CLIENT_SECRET = 'OVKemcyJC-zoePF_rWZfuygfBNYpeWmw';
  const REDIRECT_URI = 'https://noble-adventure-open-caisse.vercel.app/auth/discord/callback';

  // Échange le code contre un token
  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      scope: 'identify'
    })
  });
  const tokenData = await tokenRes.json();

  // Récupère les infos utilisateur
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const user = await userRes.json();

  // Redirige vers la page d’accueil avec l’ID Discord dans l’URL
  res.redirect(`/?discordId=${user.id}&username=${encodeURIComponent(user.username)}&avatar=${user.avatar}`);
}
