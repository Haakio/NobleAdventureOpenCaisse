export default function handler(req, res) {
  if (req.method === "POST") {
    const { userId, amount } = req.body;
    console.log("Transfert reçu :", userId, amount);
    // Ici tu pourrais enregistrer dans une base de données
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }
}