const mongoose = require('mongoose');
const { Recipe } = require('../models/index.js'); // Pfad ggf. anpassen

const mongodbURI = process.env.MONGODB_URI ||
    ((process.env.NODE_ENV === 'cookstore')
        ? 'mongodb://localhost:27017/cookstore'
        : 'mongodb://localhost:27017/cookstore');

main().catch(err => console.error(err));

async function main() {
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected to MongoDB');

        const recipes = await Recipe.find().populate('createdBy'); // optional: zeigt User-Daten mit an
        if (recipes.length === 0) {
            console.log('Keine Rezepte gefunden.');
        } else {
            console.log('Gefundene Rezepte:');
            recipes.forEach((recipe, index) => {
                console.log(`\nRezept ${index + 1}:`);
                console.log(`Titel: ${recipe.title}`);
                console.log(`Portionen: ${recipe.portions}`);
                console.log(`Labels: ${recipe.labels.join(', ')}`);
                console.log(`Erstellt von: ${recipe.createdBy?.name || 'Unbekannt'}`);
                console.log(`Zutaten:`);
                recipe.ingredients.forEach(ingredient => {
                    console.log(`- ${ingredient.amount} ${ingredient.unit} ${ingredient.name}`);
                });
            });
        }
    } catch (err) {
        console.error('Fehler beim Abrufen der Rezepte:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Verbindung zur MongoDB getrennt');
    }
}
