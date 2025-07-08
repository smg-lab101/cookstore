import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Recipe } from '@/models/index';

const MONGO_URI = process.env.MONGO_URI ?? (
  process.env.NODE_ENV === 'production'
    ? 'mongodb://mongo:27017/cookstore'
    : 'mongodb://localhost:27017/cookstore'
);

async function connectToMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToMongo();

    const titleSlug = params.id.replace(/-/g, ' ').toLowerCase();

    const recipe = await Recipe.findOne({
      title: new RegExp('^' + titleSlug + '$', 'i') // case-insensitive exact match
    }).populate('createdBy');

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (err) {
    console.error('GET /api/recipes/[id] failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
