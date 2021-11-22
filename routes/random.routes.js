const router = require("express").Router();
const axios = require("axios")
router.get("/random", (req, res, next) => {
    res.render("random.hbs")
    axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.Spoonacular_Key}`)
    .then((response) => {
    }).catch((err) => {
        next(err)
    });
});
module.exports = router; 
