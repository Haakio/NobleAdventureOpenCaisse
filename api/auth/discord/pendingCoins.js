import { connectToDatabase } from 'https://noble-adventure-open-caisse.vercel.app/lib/mongodb'; // adapte ce chemin selon ton projet

export default async function handler(req, res) {
  const { userId } = req.query;
  const { db } = await connectToDatabase();

  // Cherche la transaction non traitée pour cet utilisateur
  const transfer = await db.collection('transfers').findOne({
    user_id: userId,
    done: false
  });

  const amount = transfer ? transfer.amount : 0;
  res.status(200).json({ amount });
}
