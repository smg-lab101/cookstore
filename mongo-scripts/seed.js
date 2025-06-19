const mongoose = require('mongoose');
const { User, Recipe } = require('/Users/sarahmariagruber/Documents/HTW/06_Semester/02_VerteilteSysteme/cookstore/models/index.js'); // Passe den Pfad an

const mongodbURI = process.env.MONGODB_URI ||
    ((process.env.NODE_ENV === 'cookstore')
        ? 'mongodb://localhost:27017/cookstore'
        : 'mongodb://localhost:27017/cookstore');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected to MongoDB');

        // Schritt 1: Nutzer anlegen
        const users = await User.insertMany([
            { name: 'Sarah', email: 'sarah@example.com', passwordHash: 'sarah123' },
            { name: 'Bernd', email: 'bernd@example.com', passwordHash: 'bernd123' },
            { name: 'Vivian', email: 'vivian@example.com', passwordHash: 'vivian123' }
        ]);

        const [sarah, bernd, vivian] = users;
        console.log('Users saved:', users.map(u => u.name));

        // Schritt 2: Rezepte zuordnen und speichern
        const recipes = await Recipe.insertMany([
            {
                title: 'Sarahs Spaghetti Carbonara',
                portions: 2,
                imageUrl: 'https://example.com/spaghetti.jpg',
                labels: ['italienisch', 'schnell'],
                createdBy: sarah._id,
                ingredients: [
                    { name: 'Spaghetti', amount: 200, unit: 'g' },
                    { name: 'Eier', amount: 2, unit: 'Stück' },
                    { name: 'Parmesan', amount: 50, unit: 'g' },
                    { name: 'Pfeffer', amount: 1, unit: 'Prise' }
                ]
            },
            {
                title: 'Bernds bester Apfelkuchen',
                portions: 8,
                imageUrl: 'https://example.com/apfelkuchen.jpg',
                labels: ['süß', 'backen'],
                createdBy: bernd._id,
                ingredients: [
                    { name: 'Äpfel', amount: 5, unit: 'Stück' },
                    { name: 'Mehl', amount: 300, unit: 'g' },
                    { name: 'Zucker', amount: 150, unit: 'g' },
                    { name: 'Butter', amount: 200, unit: 'g' }
                ]
            },
            {
                title: 'Vivians vegane Bowl',
                portions: 1,
                imageUrl: 'https://example.com/bowl.jpg',
                labels: ['vegan', 'gesund'],
                createdBy: vivian._id,
                ingredients: [
                    { name: 'Quinoa', amount: 100, unit: 'g' },
                    { name: 'Kichererbsen', amount: 150, unit: 'g' },
                    { name: 'Spinat', amount: 50, unit: 'g' },
                    { name: 'Avocado', amount: 0.5, unit: 'Stück' }
                ]
            }
        ]);

        console.log('Recipes saved:', recipes.map(r => r.title));

        // Optional: Ausgabe aller gespeicherten Rezepte inkl. User
        const allRecipes = await Recipe.find().populate('createdBy');
        console.log('All recipes with user:', allRecipes);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
