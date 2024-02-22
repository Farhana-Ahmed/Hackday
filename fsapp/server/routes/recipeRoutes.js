const express = require("express");
const router = express.Router();
require("dotenv").config();

const axios = require("axios");
const itemModel = require("../models/itemModel");
const API_KEY = process.env.API_KEY;
const { fetchRecipes } = require("../utils/apiUtils");
//getting all the recipes api call
router.get("/recipes/", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
      params: { query: `${req.params.title}`, offset: "1" },
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
      },
    };

    const { query } = options.params;

    const response = await fetchRecipes(options);
    for (let i = 0; i < response.data.length; i++) {
      let item = new itemModel({
        title: response.data[i].title,
        ingredients: response.data[i].ingredients,
        servings: response.data[i].servings,
        instructions: response.data[i].instructions,
      });
      if (!item.title.includes(query)) {
        try {
          const savedItem = await item.save();
          // console.log("Item savec", savedItem);
        } catch (error) {
          console.log("error saving item", error);
        }
      }
    }
    //fetching all items from DB
    const items = await itemModel.find({});
    res.send(items);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server erro");
  }
});

//search endpoint
router.get("/search/:query", async (req, res) => {
  try {
    const searchQuery = req.params.query;

    const items = await itemModel.find({
      title: { $regex: new RegExp(searchQuery, "i") },
    });

    res.send(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

//posting a new recipe

router.post("/recipes", async (req, res) => {
  try {
    const { title, ingredients, servings, instructions } = req.body;

    const newRecipe = new itemModel({
      title,
      ingredients,
      instructions,
      servings,
    });

    const recipeSaved = await newRecipe.save();

    console.log(recipeSaved);
    res.json(recipeSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
