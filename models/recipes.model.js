const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
    recipeId: Number,
    title: String,
    image: String,
    summary: String,
    instruction: String,
    readyInMinutes: Number,
    servings: Number,
    id: Number
});

const recipe = model("recipe", recipeSchema);
module.exports = recipe;
