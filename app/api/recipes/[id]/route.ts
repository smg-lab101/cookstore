import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'app', 'data', 'recipes.json');

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const file = await fs.readFile(filePath, 'utf-8');
    const recipes = JSON.parse(file);
    const recipe = recipes.find((r: any) => r.id === params.id);

    if (!recipe) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const file = await fs.readFile(filePath, 'utf-8');
    let recipes = JSON.parse(file);

    const index = recipes.findIndex((r: any) => r.id === params.id);
    if (index === -1) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const deleted = recipes.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

    return NextResponse.json({ success: true, deleted: deleted[0] });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const file = await fs.readFile(filePath, 'utf-8');
    const recipes = JSON.parse(file);

    const index = recipes.findIndex((r: any) => r.id === params.id);
    if (index === -1) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    recipes[index] = { ...recipes[index], ...body };
    await fs.writeFile(filePath, JSON.stringify(recipes, null, 2));

    return NextResponse.json({ success: true, updated: recipes[index] });
}
