import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Recipe } from '@/models/index'; // points to models/index.js
import dotenv from 'dotenv';
import dbConnect from '@/lib/dbConnect';

// Load env vars (useful for local dev)
dotenv.config();



export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const title = params.id.replace(/-/g, ' ').toLowerCase();

  try {
    await dbConnect();

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
    await dbConnect();

    const newRecipe = await Recipe.create(body);
    return NextResponse.json({ success: true, recipe: newRecipe });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
