const router = require("express").Router();

router.get("/recipes", (req, res, next) => {
    ios.get(`https://api.spoonacular.com/recipes/random?number=1&TAGS=drink&apiKey=${process.env.Spoonacular_Key}`)
    .then((result) => {
        res.render("recipes.hbs")
        
    }).catch((err) => {
        
    });
});

module.exports = router; 
