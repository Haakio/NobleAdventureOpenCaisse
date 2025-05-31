export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
  const { userId } = req.body;

  // Ici tu dois mettre à jour ta base de données pour mettre à 0 ou "claimed"
  // await markCoinsClaimedInDB(userId);

  res.status(200).json({ success: true });
}
