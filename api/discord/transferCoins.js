import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("adventure");
  const col = db.collection("transfers");

  if (req.method === "POST") {
    const { userId, amount } = req.body;
    if (!userId || typeof amount !== "number" || amount <= 0) {
      res.status(400).json({ success: false, message: "Paramètres invalides" });
      return;
    }
    await col.insertOne({ user_id: userId, amount, done: false, date: new Date() });
    res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    const transfers = await col.find({ done: false }).toArray();
    res.status(200).json(transfers);
  } else if (req.method === "PATCH") {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      res.status(400).json({ success: false, message: "ids manquant" });
      return;
    }
    await col.updateMany(
      { _id: { $in: ids.map(id => new ObjectId(id)) } },
      { $set: { done: true } }
    );
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ success: false, message: "Méthode non autorisée" });
  }
}
