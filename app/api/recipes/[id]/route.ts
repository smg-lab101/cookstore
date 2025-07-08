import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Recipe } from '@/models/index';
import dbConnect from '@/lib/dbConnect';


export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

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
