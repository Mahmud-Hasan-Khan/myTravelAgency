// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = process.env.MONGODB_URI; 

// export default async function dbConnect(collectionName){
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     await client.connect();
//     const db=client.db(process.env.DB_NAME);
//     const collection =db.collection(collectionName);

// return {client, db, collection}

// }

// src/lib/dbConnect.js

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 20000,
  connectTimeoutMS: 20000,
};

let client;
let clientPromise;

// Global caching for development (hot reload safe)
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function dbConnect(collectionName) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);
    return { client, db, collection };
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Failed to connect to MongoDB.");
  }
}
