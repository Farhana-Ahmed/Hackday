const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    default: "",
  },
  servings: {
    type: String,
    default: "",
  },
  instructions: {
    type: String,
    default: "",
  },
});
const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
