import { MongoClient } from "mongodb";

export default function handler(req, res) {
  res.status(200).json({ ok: true });
}

  // Cherche la transaction non traitée pour cet utilisateur
  const transfer = await db.collection('transfers').findOne({
    user_id: userId,
    done: false
  });

  const amount = transfer ? transfer.amount : 0;
  res.status(200).json({ amount });
}
