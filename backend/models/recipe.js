const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    recipeId: {type:String, required:true},
    title: {type:String,required:true},
    image: String,
    order: {type:Number,default:0}
});

module.exports = mongoose.model('Recipe',RecipeSchema);