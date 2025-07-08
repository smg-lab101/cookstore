/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { POST } from '@/app/api/recipes/new/route'; // Adjust path as needed
import { Recipe } from '@/models/index';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Recipe.deleteMany({});
});

describe('POST /api/recipes/new', () => {
  it('should create a new recipe', async () => {
    const req = new Request('http://localhost:3001/api/recipes/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Bernds Mandeln',
        description: '',
        steps: '',
        imageUrl: 'Bild',
        labels: [],
        ingredients: [{ name: '', amount: 0, unit: '' }]
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.recipe.title).toBe('Bernds Mandeln');

    const recipes = await Recipe.find({});
    expect(recipes).toHaveLength(1);
  });
});
