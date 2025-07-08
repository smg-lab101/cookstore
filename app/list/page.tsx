import Link from "next/link";
import { getRecipes } from "../../lib/getRecipes"; // <-- ✅ use relative path

export default async function RecipeList() {
  const recipes = await getRecipes();

  return (
    <div>
      <div className="header">
        <div className="logo">Logo</div>
        <Link href="/new" className="btn">Neues Rezept</Link>
      </div>

      <h1>Meine Rezepte</h1>

      <div className="content">
        {recipes.map((recipe: any) => (
          <div className="recipe-card" key={recipe._id}>
            <a href={`/detail/${recipe.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="recipe-image">{recipe.imageUrl}</div>
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
