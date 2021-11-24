const { Schema, model } = require("mongoose");

// const recipesSchema = new Schema({
// 	Recipeid: {
// 		type: Number,
// 		unique: true
// 	},
// 	Title: {
// 		type: String,
// 		required: true
// 	},
// 	Description: {
// 		type: String,
// 	},
// 	Steps:{
		
// 	},


// Title: String
// Description: String
// Steps: String
// Ingredients: String , Numbers
// Cusine type: String
// Duration: Number
// Image: img  
// });

const User = model("User", userSchema);

module.exports = User;