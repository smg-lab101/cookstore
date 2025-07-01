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
            id: "carbonara",
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
            id: "apfelkuchen",
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
