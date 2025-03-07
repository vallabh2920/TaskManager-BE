const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
});

let db;

async function connectDB() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }

    db = client.db("taskManagerDB"); // Change to your actual DB name
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
}

// Close MongoDB connection when the server stops
process.on("SIGINT", async () => {
  if (client) {
    await client.close();
    console.log("🔌 MongoDB Disconnected.");
    process.exit(0);
  }
});

module.exports = { connectDB, getDB };
