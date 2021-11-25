const router = require("express").Router();

router.post("/recipes/:id", (req, res, next) => {
   axios.get(`https://api.spoonacular.com/recipes/complexSearch?recipeBoxId=716252`)
   .then((result) => {
     res.render("recipes.hbs", {recipes:result.data.recipes})
     console.log(result.data)
   }).catch((err) => {
   });
  })


module.exports = router; 
