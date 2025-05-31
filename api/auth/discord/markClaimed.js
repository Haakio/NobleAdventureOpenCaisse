import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
  const { userId } = req.body;
  const { db } = await connectToDatabase();

  await db.collection('transfers').updateMany(
    { user_id: userId, done: false },
    { $set: { done: true } }
  );

  res.status(200).json({ success: true });
}
