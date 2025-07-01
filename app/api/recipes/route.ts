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

export async function GET() {
  try {
    await connectToMongo();
    const recipes = await Recipe.find().populate('createdBy');
    return NextResponse.json(recipes);
  } catch (err) {
    console.error('GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
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
