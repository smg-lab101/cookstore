const mongoose = require('mongoose');
const { User, Recipe } = require('./models');

mongoose.connect('mongodb://mongo:27017/cookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function seed() {
    await mongoose.connection.dropDatabase();

    const user = new User({
        name: 'Sarah',
        email: 'sarah@example.com',
        passwordHash: 'hashed-password'
    });
    await user.save();

    const recipe = new Recipe({
        title: 'Spaghetti Carbonara',
        portions: 4,
        imageUrl: '',
        labels: ['Italian', 'Dinner'],
        createdBy: user._id,
        ingredients: [
            { name: 'Spaghetti', amount: 400, unit: 'g' },
            { name: 'Eggs', amount: 4, unit: 'pcs' },
            { name: 'Pancetta', amount: 150, unit: 'g' }
        ]
    });

    await recipe.save();
    console.log('✅ Seed completed');
    mongoose.disconnect();
}

seed();
