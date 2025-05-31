import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Mets ta vraie URI dans les variables d'environnement Vercel
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI n'est pas défini dans les variables d'environnement");
}

if (process.env.NODE_ENV === "development") {
  // En dev, utilise une variable globale pour éviter de recréer le client à chaque hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En prod, crée un nouveau client à chaque fois
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(); // ou client.db("nom_de_ta_db") si tu veux préciser
  return { client, db };
}