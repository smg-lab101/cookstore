import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Recipe } from '@/models/index';

// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI ?? (
  process.env.NODE_ENV === 'production'
    ? 'mongodb://mongo:27017/cookstore' // in Docker
    : 'mongodb://localhost:27017/cookstore' // local dev in IDE
);

async function connectToMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
}

// ✅ This is the magic: use type `Params` from Next.js App Router context
export async function GET(
  req: NextRequest,
  {params}: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToMongo();

    const recipe = await Recipe.findById(id).populate('createdBy');

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (err) {
    console.error('GET /api/recipes/[id] failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
