// app/list/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link"


type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default async function RecipeList() {
  const dataPath = path.join(process.cwd(), "app/data/recipes.json");
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  const recipes: Recipe[] = JSON.parse(jsonData);

  return (
    <div>
      <div className="header">
        <div className="logo">Logo</div>
        <Link href="/new" className="btn">Neues Rezept</Link>
      </div>

      <h1>Meine Rezepte</h1>

      <div className="content">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <a href={`/detail/${recipe.id}`}>
              <div className="recipe-image">{recipe.image}</div>
              <div className="recipe-info">
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-details">{recipe.description}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
