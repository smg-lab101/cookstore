// app/detail/[id]/page.tsx
import fs from "fs";
import path from "path";
// export const dynamicParams = false;


type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    steps: string;
};

export async function generateStaticParams() {
    const dataPath = path.join(process.cwd(), "app/data/recipes.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const recipes: Recipe[] = JSON.parse(jsonData);

    return recipes.map((recipe) => ({
        id: recipe.id,
    }));
}

export default async function RecipeDetail({
                                               params,
                                           }: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;

    const dataPath = path.join(process.cwd(), "app/data/recipes.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const recipes: Recipe[] = JSON.parse(jsonData);

    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
        return <div>Rezept nicht gefunden für ID: {id}</div>;
    }

    return (
        <div>
            <div className="header">
                <div className="logo">Logo</div>
                <div>
                    <a href="/list" className="btn">Zu den Rezepten</a>
                    <a href="/new" className="btn">Neues Rezept</a>
                </div>
            </div>

            <div className="content">
                <div className="recipe-detail-container">
                    <div className="detail-image">{recipe.image}</div>
                    <div className="detail-info">
                        <div className="recipe-title">{recipe.title}</div>
                        <div className="recipe-details">{recipe.description}</div>
                    </div>
                </div>

                <div className="recipe-full-details">
                    <h3>Zutaten:</h3>
                    <ul>
                        {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h3>Zubereitung:</h3>
                    <p>{recipe.steps}</p>
                </div>
            </div>
        </div>
    );
}