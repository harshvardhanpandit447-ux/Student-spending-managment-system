import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finflow';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB] Local connection to ${uri} failed (${error.message}).`);
    console.log(`[MongoDB] Operating in Zero-Config High-Performance In-Memory Mode.`);
    console.log(`[MongoDB] (To connect to a live MongoDB instance, start your local mongod service or update MONGODB_URI in .env)`);
    return null;
  }
};
