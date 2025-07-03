import mongoose from 'mongoose';
import { Recipe } from '@/models/index';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/cookstore';

export async function getRecipes() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
  return Recipe.find().lean();
}
