export default async function handler(req, res) {
  const { userId } = req.query;

  // Ici tu dois récupérer le montant depuis ta base de données
  // Exemple fictif (à remplacer par ta logique réelle) :
  // const amount = await getPendingCoinsFromDB(userId);

  // Pour le test, on retourne 0 si rien trouvé
  let amount = 0;

  // Exemple : tu peux utiliser un stockage JSON, MongoDB, etc.
  // if (userId === "123456789") amount = 500;

  res.status(200).json({ amount });
}
