 const axios = require("axios");
 const { response } = require("express");
 const router = require("express").Router();
 const typesCusine =['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese'];
 const diet = ['Gluten Free', 'Vegan', 'Vegetarian'];
 const intolerances = [ 'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nuts', 'Wheat'];
 const types = [ 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
 /* GET home page */
 router.get("/", (req, res, next) => {
   res.render("home.hbs" , {typesCusine, diet, intolerances, types}) 
 });
 router.post("/", (req, res, next) => {
   console.log(req.body)
   let {cuisine, diet, intolerances, types} = req.body
   if(cuisine == "Random" ||diet == "None" ||intolerances == "None" || types == "None"){
     res.redirect("/")
   }
  axios.get(`https://api.spoonacular.com/recipes/random?number=3&tags=${cuisine, diet, intolerances, types}&apiKey=${process.env.Spoonacular_Key}`)
  .then((result) => {
    res.render("recipes.hbs", {recipes:result.data.recipes})
    console.log(result.data)
  }).catch((err) => {
  });
 })
 module.exports = router;