const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();
const port = 3002;

// Handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public_html")));
app.use(express.urlencoded({ extended: true })); // for POST forms

// Sample recipe data
const recipes = require("./data/recipes.json");

// Serving as handlebars template
app.get("/list", (req, res) => {
  const recipeList = recipes.map(r => ({ ...r, link: `/detail/${r.id}` }));
  res.render("list", { recipes: recipeList });
});

app.get("/detail/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) return res.status(404).send("Rezept nicht gefunden");
  res.render("detail", recipe);
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

