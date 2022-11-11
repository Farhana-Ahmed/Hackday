const mongoose = require("mongoose");

 const ItemSchema = new mongoose.Schema({
     title: {
        type: String,
         required: true,
     },
    ingredients: {
        type:String,
         default:''
    },
    servings: {
        type:String,
        default:''
     },
     instructions: {
         type:String,
         default:''
     }
 })
const User = mongoose.model('Item' , ItemSchema);
 module.exports = User