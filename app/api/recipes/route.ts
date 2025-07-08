import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Recipe } from '@/models/index'; // points to models/index.js
import dotenv from 'dotenv';

// Load env vars (useful for local dev)
dotenv.config();

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

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const title = params.id.replace(/-/g, ' ').toLowerCase();

  try {
    await connectToMongo();

    const recipe = await Recipe.findOne({
      title: new RegExp('^' + title + '$', 'i') // case-insensitive exact match
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToMongo();

    const newRecipe = await Recipe.create(body);
    return NextResponse.json({ success: true, recipe: newRecipe });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
