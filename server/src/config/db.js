import mongoose from 'mongoose';

export let isMongoConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️  No MONGODB_URI provided. Running in high-performance in-memory hybrid store mode.');
    return;
  }

  try {
    await mongoose.connect(uri);
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas successfully.');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed, falling back to in-memory store:', error.message);
    isMongoConnected = false;
  }
}
