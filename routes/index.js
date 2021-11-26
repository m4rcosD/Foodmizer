 const axios = require("axios");
 const { response } = require("express");
 const router = require("express").Router();
 const User = require("../models/User.model");
 const Recipe = require("../models/recipes.model");
 const typesCusine =['African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese'];
 const diet = ['Gluten Free', 'Vegan', 'Vegetarian'];
 const intolerances = [ 'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nuts', 'Wheat'];
 const types = [ 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'];
 /* GET home page */
 router.get("/", (req, res, next) => {
   res.render("home.hbs" , {typesCusine, diet, intolerances, types}) 
 });
 router.get("/recipe", (req, res, next) => {
  res.render("recipes.hbs") 
});
 router.post("/", (req, res, next) => {
   let {cuisine, diet, intolerances, types} = req.body
   if(cuisine == "Random" ||diet == "None" ||intolerances == "None" || types == "None"){
     res.redirect("/")
   }
  axios.get(`https://api.spoonacular.com/recipes/random?number=1&tags=${cuisine, diet, intolerances, types}&apiKey=${process.env.Spoonacular_Key}`)
  .then((result) => {
    res.render("recipes.hbs", {recipes:result.data.recipes})
  }).catch((err) => {
  });
 })

 router.get('/myRecipe/:id', (req, res, next) =>{
  //  console.log(req.params.id)
  let title = ""
  let image = ""
  let summary = ""
  let instruction = ""
  let servings = ""

  axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.Spoonacular_Key}`)
  .then((res)=>{
    title = res.data.title,
    image = res.data.image,
    summary = res.data.summary,
    instruction = res.data.instruction,
    readyInMinutes = res.data.readyInMinutes,
    servings = res.data.servings
    console.log
  })
  .then((res)=>{
    return Recipe.create({
    title,
    summary,
    image,
    instruction,
    readyInMinutes,
    servings,
    id: req.params.id,
    });
  })
  .then((recipe) => {
    return User.findByIdAndUpdate(req.session.myProperty._id, {$push:{fav: recipe._id}} )
  })
  .then(() => {
    res.redirect('/profile')
    return;
  })
  .catch((err) => {
        next(err)
  });
})

router.post("/myRecipe/:id", (req, res, next) => {

  axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.Spoonacular_Key}`)
  
  Recipe.findById(id)
    .then(() => {
      res.redirect("/recipe");
    })
    .catch(() => {
      next("Deleting failed");
    });
});


router.post("/myRecipe/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  console.log(id);

  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/profile");
    })
    .catch(() => {
      next("Deleting failed");
    });
});

router.get("/recipe/:id", (req, res, next) => {
  const { id } = req.params;
  Recipe.findOne({id})
    .then((recipe) => {
      console.log(recipe, "hey")
      res.render("recipes.hbs", {recipe}) 
      
    }).catch((err) => {
      next("err");
    });

});



  module.exports = router;