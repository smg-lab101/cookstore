import mongoose, { Schema } from 'mongoose';

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

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
