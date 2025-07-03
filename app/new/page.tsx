"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";

const NewRecipePage: NextPage = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        ingredients: "",
        steps: "",


    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const payload = {
        title: formData.title,
        description: formData.description,
        steps: formData.steps,
        imageUrl: "Bild", // or real URL later
        labels: [],       // optional for now
        ingredients: formData.ingredients.split(",").map(i => {
          const match = i.trim().match(/^(\d+)\s*([a-zA-Z]+)?\s+(.*)$/);
          if (!match) return { name: i.trim(), amount: 0, unit: "" };
          const [, amount, unit, name] = match;
          return {
            name,
            amount: parseInt(amount, 10),
            unit: unit || "",
          };
        }),
        // optional: createdBy can be added later from session/user state
      };

      const res = await fetch("/api/recipes/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/list");
      } else {
        alert("Fehler beim Speichern");
      }
    };
    return (
        <div>
            <div className="header">
                <div className="logo">Logo</div>
                <div>
                    <Link href="/list" className="btn">Zu den Rezepten</Link>
                    <button form="newRecipeForm" type="submit" className="btn">Speichern</button>
                </div>
            </div>

            <div className="content">
                <form id="newRecipeForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titel des Rezepts</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            placeholder="Titel eingeben"
                            required
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <div className="recipe-detail-container">
                            <div className="detail-image">Bild</div>
                            <div className="form-group" style={{ flexGrow: 1 }}>
                                <label htmlFor="description">Rezept-Beschreibung</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control form-textarea"
                                    placeholder="Kurze Beschreibung"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ingredients">Zutaten (kommagetrennt)</label>
                        <textarea
                            id="ingredients"
                            name="ingredients"
                            className="form-control form-textarea"
                            placeholder="z.B. 200g Mehl, 100g Zucker"
                            value={formData.ingredients}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="steps">Zubereitungsschritte</label>
                        <textarea
                            id="steps"
                            name="steps"
                            className="form-control form-textarea"
                            placeholder="Beschreibe hier die Zubereitung"
                            value={formData.steps}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </div>
    );

}

export default NewRecipePage;