const { Schema, model } = require("mongoose");
require('./recipes.model')
const userSchema = new Schema({
	name: String,
	diet: String,
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	image: String,
	fav: [{
		type: Schema.Types.ObjectId,
		ref: "recipe"
	}] 
});

const User = model("User", userSchema);

module.exports = User;