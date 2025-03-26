// src/lib/dbConnect.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
      conn: typeof import('mongoose') | null;
      promise: Promise<typeof import('mongoose')> | null;
    };
  }
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env file');
}

// Cache the connection (this helps during hot reload in development)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((conn) => conn);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
