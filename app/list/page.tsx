// app/list/page.tsx
import Link from "next/link";

type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default async function RecipeList() {
  const res = await fetch("http://localhost:3000/api/recipes", {
    cache: "no-store", // wichtig, damit neue Rezepte direkt angezeigt werden
  });


  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Invalid response from API:", data);
    return <div>Fehler beim Laden der Rezepte</div>;
  }

  const recipes: Recipe[] = data;

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
