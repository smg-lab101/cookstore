/**
 * @jest-environment node
 */

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Recipe, User } from "@/models/index";
import { getRecipes } from "@/lib/getRecipes"; // <-- ✅ use relative path


let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "TestCookstore" });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Recipe Model", () => {
  test("should create and retrieve a recipe", async () => {
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      passwordHash: "hashed",
    });

    const createdRecipe = await Recipe.create({
      title: "Jest Soup",
      portions: 4,
      imageUrl: "https://example.com/soup.jpg",
      labels: ["soup", "test"],
      createdBy: user._id,
      ingredients: [
        { name: "Water", amount: 500, unit: "ml" },
        { name: "Salt", amount: 1, unit: "TL" },
      ],
    });

    const foundRecipe = await Recipe.findById(createdRecipe._id).populate("createdBy");

    expect(foundRecipe?.title).toBe("Jest Soup");
    expect(foundRecipe?.ingredients).toHaveLength(2);
    expect(foundRecipe?.createdBy.name).toBe("Test User");
  });

  test("should return empty array when no recipes exist", async () => {
    const recipes = await getRecipes();
    expect(recipes).toEqual([]);
  });
});
