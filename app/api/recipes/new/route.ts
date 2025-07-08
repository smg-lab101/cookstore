4// app/api/recipes/new/route.ts

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

 export async function POST(req: NextRequest) {
   try {
     const body = await req.json();
     await connectToMongo();

     // Save the recipe to MongoDB
     const newRecipe = await Recipe.create({ ...body });

     return NextResponse.json({ success: true, recipe: newRecipe });
   } catch (error) {
     console.error("Fehler in POST /api/recipes/new:", error);
     return NextResponse.json({ success: false, error: 'Interner Fehler' }, { status: 500 });
   }
 }
