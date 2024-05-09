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
async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const database = client.db("AnimeRecommendationDB");
    const collection = database.collection('Users');

    // Test
    const doc = { name: "WildFister88"}; // my own test account
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);