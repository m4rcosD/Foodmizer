const router = require("express").Router();

router.post("/myRecipe/:id", (req, res, next) => {
   axios.get(`https://api.spoonacular.com/recipes/complexSearch?recipeBoxId=716252`)
   .then((result) => {
     res.render("recipes.hbs", {recipes:result.data.recipes})
   }).catch((err) => {
   });
  })


module.exports = router; 
