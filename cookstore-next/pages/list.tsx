import path from "path";
import fs from "fs";
import { GetStaticProps } from "next";

type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
};

type Props = {
    recipes: Recipe[];
};

export default function RecipeList({ recipes }: Props) {
    return (
        <div>
            <div className="header">
                <div className="logo">Logo</div>
                <a href="/new" className="btn">Neues Rezept</a>
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

// Holt Rezepte zur Buildzeit
export const getStaticProps: GetStaticProps = async () => {
    const dataPath = path.join(process.cwd(), "data", "recipes.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const recipes = JSON.parse(jsonData);

    return {
        props: {
            recipes,
        },
    };
};
