const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  passwordHash: String,
});

const RecipeSchema = new Schema({
  title: String,
  portions: Number,
  imageUrl: String,
  labels: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  ingredients: [{ name: String, amount: Number, unit: String }],
  description: String,
  steps: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe, User };