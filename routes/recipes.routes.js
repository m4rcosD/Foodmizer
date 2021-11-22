const router = require("express").Router();
const axios = require("axios")
axios.get(`https://api.spoonacular.com/recipes/716429/information?apiKey=${process.env.Spoonacular_Key}&includeNutrition=true.`)
.then((result) => {

}).catch((err) => {
    
});

module.exports = router; 
