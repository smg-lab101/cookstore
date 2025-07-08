// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGO_URI =
  process.env.MONGO_URI ??
  (process.env.NODE_ENV === 'production'
    ? 'mongodb://mongo:27017/cookstore'
    : 'mongodb://localhost:27017/cookstore');

export function isMongooseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export default async function dbConnect(
  checkConnected: () => boolean = isMongooseConnected
) {
  if (!checkConnected()) {
    await mongoose.connect(MONGO_URI);
  }
}
