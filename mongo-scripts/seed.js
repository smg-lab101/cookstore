const mongoose = require('mongoose');
const { Recipe, User } = require('../models/index.js'); // Pfad ggf. anpassen


const mongodbURI = process.env.MONGO_URI || 'mongodb://mongo:27017/cookstore';

async function main() {
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        await Recipe.deleteMany({});

        // Nutzer anlegen
        const users = await User.insertMany([
            { name: 'Sarah', email: 'sarah@example.com', passwordHash: 'sarah123' },
            { name: 'Bernd', email: 'bernd@example.com', passwordHash: 'bernd123' },
            { name: 'Vivian', email: 'vivian@example.com', passwordHash: 'vivian123' }
        ]);

        const [sarah, bernd, vivian] = users;

        const recipes = [
          {
            title: "Sarahs Spaghetti Carbonara",
            description: "Italienischer Klassiker mit Eiern, Käse und Speck",
            imageUrl: "Bild",
            ingredients: [
              { name: "Spaghetti", amount: 400, unit: "g" },
              { name: "Pancetta oder Guanciale", amount: 200, unit: "g" },
              { name: "Eier", amount: 4, unit: "Stück" },
              { name: "Pecorino Romano", amount: 100, unit: "g" },
              { name: "Salz und Pfeffer", amount: 0, unit: "optional" }
            ],
            steps: `Spaghetti in Salzwasser kochen ...`,
            createdBy: sarah._id
          },
          {
            title: "Bernds bester Apfelkuchen",
            description: "Traditioneller Kuchen mit frischen Äpfeln und Zimt",
            imageUrl: "Bild",
            ingredients: [
              { name: "Äpfel", amount: 5, unit: "Stück" },
              { name: "Mehl", amount: 200, unit: "g" },
              { name: "Butter", amount: 100, unit: "g" },
              { name: "Zucker", amount: 100, unit: "g" },
              { name: "Eier", amount: 2, unit: "Stück" },
              { name: "Zimt", amount: 1, unit: "TL" },
              { name: "Backpulver", amount: 1, unit: "TL" }
            ],
            steps: `Backofen auf 180°C vorheizen ...`,
            createdBy: bernd._id
          },
          {
            title: "Vivians bunter Quinoasalat",
            description: "Frischer, leichter Salat mit Gemüse und Feta",
            imageUrl: "Bild",
            ingredients: [
              { name: "Quinoa", amount: 150, unit: "g" },
              { name: "Rote Paprika", amount: 1, unit: "Stück" },
              { name: "Gurke", amount: 0.5, unit: "Stück" },
              { name: "Feta", amount: 100, unit: "g" },
              { name: "Frühlingszwiebeln", amount: 2, unit: "Stück" },
              { name: "Zitronensaft", amount: 1, unit: "Stück" },
              { name: "Olivenöl", amount: 2, unit: "EL" },
              { name: "Salz und Pfeffer", amount: 0, unit: "optional" }
            ],
            steps: `Quinoa nach Packungsanweisung kochen ...`,
            createdBy: vivian._id
          },
          {
            title: "Vivians schnelle Brokkoli-Pasta",
            description: "Cremige Pasta mit grünem Gemüse",
            imageUrl: "Bild",
            ingredients: [
              { name: "Pasta", amount: 300, unit: "g" },
              { name: "Brokkoli", amount: 1, unit: "Stück" },
              { name: "Knoblauchzehe", amount: 1, unit: "Stück" },
              { name: "Sahne", amount: 100, unit: "ml" },
              { name: "Parmesan", amount: 50, unit: "g" },
              { name: "Olivenöl", amount: 1, unit: "EL" },
              { name: "Salz und Pfeffer", amount: 0, unit: "optional" }
            ],
            steps: `Pasta in Salzwasser kochen ...`,
            createdBy: vivian._id
          },
          {
            title: "Sarahs Frühstücksbowle mit Vodka",
            description: "Gesunde Bowl mit Joghurt, Früchten und Haferflocken",
            imageUrl: "Bild",
            ingredients: [
              { name: "Naturjoghurt", amount: 200, unit: "g" },
              { name: "Haferflocken", amount: 2, unit: "EL" },
              { name: "Honig", amount: 1, unit: "TL" },
              { name: "Heidelbeeren", amount: 1, unit: "Handvoll" },
              { name: "Himbeeren", amount: 1, unit: "Handvoll" },
              { name: "Banane", amount: 0.5, unit: "Stück" },
              { name: "Chiasamen", amount: 1, unit: "TL" }
            ],
            steps: `Joghurt mit Haferflocken und Honig verrühren ...`,
            createdBy: sarah._id
          },
          {
            title: "Bernds rustikaler Flammkuchen",
            description: "Herzhafter Flammkuchen mit Speck und Zwiebeln",
            imageUrl: "Bild",
            ingredients: [
              { name: "Mehl", amount: 250, unit: "g" },
              { name: "Wasser", amount: 125, unit: "ml" },
              { name: "Öl", amount: 2, unit: "EL" },
              { name: "Salz", amount: 1, unit: "Prise" },
              { name: "Crème fraîche", amount: 150, unit: "g" },
              { name: "Speckwürfel", amount: 100, unit: "g" },
              { name: "Zwiebel", amount: 1, unit: "Stück" }
            ],
            steps: `Backofen auf 220°C vorheizen ...`,
            createdBy: bernd._id
          }
        ];


        await Recipe.insertMany(recipes);
        console.log('Rezepte gespeichert:', recipes.map(r => r.title));

        const allRecipes = await Recipe.find().populate('createdBy');
        console.log('Alle Rezepte mit Benutzer:', allRecipes);

    } catch (err) {
        console.error('Fehler:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Verbindung zu MongoDB beendet');
    }


}
    main().catch(err=> ('Fehler', err));
