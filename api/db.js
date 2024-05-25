import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBUsername = process.env.MONGO_DB_USERNAME;
const mongoDBPassword = process.env.MONGO_DB_PASSWORD;
const mongoUri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@animersion.vhua5vh.mongodb.net/?retryWrites=true&w=majority&appName=animersion`;
console.log("MongoDB URI: ", mongoUri);
const client = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to database
export async function connectToDatabase() {
  try {
    return client.connect();
    console.log("Connected successfully to server");
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
}