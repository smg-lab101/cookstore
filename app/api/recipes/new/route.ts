// app/api/recipes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const filePath = path.join(process.cwd(), 'app', 'data', 'recipes.json');
        const file = await fs.readFile(filePath, 'utf-8');
        const recipes = JSON.parse(file);

        const newRecipe = { ...body };
        recipes.push(newRecipe);

        await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

        return NextResponse.json({ success: true, recipe: newRecipe });
    } catch (error) {
        console.error("Fehler in API:", error);
        return NextResponse.json({ success: false, error: 'Interner Fehler' }, { status: 500 });
    }
}
