import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";

type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    steps: string;
};

type Props = {
    recipe: Recipe;
};

export default function RecipeDetail({ recipe }: Props) {
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

// Holt mögliche IDs für Static Generation
export const getStaticPaths: GetStaticPaths = async () => {
    const dataPath = path.join(process.cwd(), "data", "recipes.json");
    const data = fs.readFileSync(dataPath, "utf-8");
    const recipes: Recipe[] = JSON.parse(data);

    const paths = recipes.map((r) => ({
        params: { id: r.id },
    }));

    return {
        paths,
        fallback: false, // 404 für unbekannte Rezepte
    };
};

// Holt ein einzelnes Rezept anhand der ID
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const dataPath = path.join(process.cwd(), "data", "recipes.json");
    const data = fs.readFileSync(dataPath, "utf-8");
    const recipes: Recipe[] = JSON.parse(data);

    const recipe = recipes.find((r) => r.id === params?.id);

    if (!recipe) {
        return { notFound: true };
    }

    return {
        props: {
            recipe,
        },
    };
};
