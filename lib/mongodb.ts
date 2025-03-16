// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority';
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio';

// Check if we're in a production environment
const isProd = process.env.NODE_ENV === 'production';

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new connection
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // Cache the connection in development
  if (!isProd) {
    cachedClient = client;
    cachedDb = db;
  }

  return { client, db };
}