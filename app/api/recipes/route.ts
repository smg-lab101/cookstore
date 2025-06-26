import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'app', 'data', 'recipes.json');

export async function GET() {
    const file = await fs.readFile(filePath, 'utf-8');
    const recipes = JSON.parse(file);
    return NextResponse.json(recipes);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const file = await fs.readFile(filePath, 'utf-8');
    const recipes = JSON.parse(file);

    const newRecipe = {
        id: body.title.toLowerCase().replace(/\s+/g, '-'),
        ...body,
    };

    recipes.push(newRecipe);
    await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

    return NextResponse.json({ success: true, recipe: newRecipe });
}
