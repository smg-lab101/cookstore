const mongoose = require('mongoose');
const { Recipe, User } = require('../models/index.js'); // Pfad ggf. anpassen

const mongodbURI = process.env.MONGODB_URI ||
    ((process.env.NODE_ENV === 'cookstore')
        ? 'mongodb://localhost:27017/cookstore'
        : 'mongodb://localhost:27017/cookstore');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected to MongoDB');

        const user = new User({
            name: 'Sarah',
            email: 'sarah@example.com',
            passwordHash: 'hashed_password'
        });

        await user.save();
        console.log('User saved:', user._id

        );

        // Beispiel-Rezept ohne User speichern
        const recipe = new Recipe({
            title: 'Sarahs Gemüsesuppe',
            portions: 3,
            imageUrl: 'https://example.com/gemuesesuppe.jpg',
            labels: ['vegetarisch', 'leicht'],
            createdBy: user._id,
            ingredients: [
                { name: 'Karotten', amount: 3, unit: 'Stück' },
                { name: 'Kartoffeln', amount: 2, unit: 'Stück' },
                { name: 'Lauch', amount: 1, unit: 'Stange' },
                { name: 'Gemüsebrühe', amount: 1, unit: 'l' }
            ]
        });

        await recipe.save();
        console.log('Recipe saved:', recipe);

        const recipes = await Recipe.find();
        console.log('All recipes:', recipes);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
