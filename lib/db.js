const MONGO_URI = "mongodb+srv://admin123:admin123@nextjscrud.lipodpl.mongodb.net/?retryWrites=true&w=majority"

import { MongoClient } from 'mongodb';


export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGO_URI);

  return client;
}