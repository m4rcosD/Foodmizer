const axios = require("axios");
const { response } = require("express");
const router = require("express").Router();
const typesCusine =['Random', 'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese'];
const diet = ['None','Gluten Free', 'Vegan', 'Vegetarian'];
const intolerances = ['None', 'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nuts', 'Wheat'];
const types = ['None', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
/* GET home page */

router.get("/", (req, res, next) => {
  res.render("home.hbs" , {typesCusine, diet, intolerances, types})
  // axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.Spoonacular_Key}`)
  // .then((response) => {
  //   console.log()
  // }).catch((err) => {
    
  // });
});

module.exports = router;
