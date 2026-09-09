import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    // Attempt standard connection to specified URI (Atlas or local mongod)
    if (uri && !uri.includes('localhost:27017')) {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}`);
      return;
    }

    // Try local mongod first if localhost URI
    try {
      const conn = await mongoose.connect(uri || 'mongodb://localhost:27017/interviewai', {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`[MongoDB] Connected to local MongoDB at: ${conn.connection.host}`);
      return;
    } catch (localErr) {
      console.log('[MongoDB] Local MongoDB daemon not detected, starting in-memory MongoDB instance...');
    }

    // Spin up zero-config in-memory MongoDB for seamless development & portfolio testing
    mongoMemoryServer = await MongoMemoryServer.create({
      instance: { dbName: 'interviewai' },
    });
    const memoryUri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`[MongoDB] Connected to In-Memory MongoDB at: ${conn.connection.host}`);
    console.log(`[MongoDB] Tip: Set MONGODB_URI in server/.env to point to your MongoDB Atlas cluster for persistence.`);
  } catch (error) {
    console.error(`[MongoDB Error]: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
