'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

type Recipe = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  steps: string;
};

export default function RecipeDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    fetch(`/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  const handleDelete = async () => {
    if (!id || typeof id !== 'string') return;
    if (!confirm("Wirklich löschen?")) return;

    const res = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/list');
    } else {
      alert('Fehler beim Löschen');
    }
  };

  if (!recipe) return <div>Lade Rezept...</div>;

  return (
    <div>
      <div className="header">
        <div className="logo">Logo</div>
        <div>
          <Link href="/list" className="btn">Zu den Rezepten</Link>
          <Link href="/new" className="btn">Neues Rezept</Link>
          <button onClick={handleDelete} className="btn">Löschen</button>
        </div>
      </div>

      <div className="content">
        <div className="recipe-detail-container">
          <div className="detail-image">{recipe.imageUrl}</div>
          <div className="detail-info">
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-details">{recipe.description}</div>
          </div>
        </div>

        <div className="recipe-full-details">
          <h3>Zutaten:</h3>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>
                {item.amount} {item.unit} {item.name}
              </li>
            ))}
          </ul>

          <h3>Zubereitung:</h3>
          <p>{recipe.steps}</p>
        </div>
      </div>
    </div>
  );
}
