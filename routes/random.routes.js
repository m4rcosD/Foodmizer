const router = require("express").Router();
const axios = require("axios")
router.get("/random", (req, res, next) => {
    axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.Spoonacular_Key}`)
    .then((response) => {
        res.render("random.hbs", {recipe:title})
        
    })
    .catch((err) => {
        next(err)
    });
});
module.exports = router; 
