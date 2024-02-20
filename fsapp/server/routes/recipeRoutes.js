const express = require("express");
const router = express.Router();
require("dotenv").config();

const axios = require("axios");
const itemModel = require("../models/itemModel");
const API_KEY = process.env.API_KEY;
const { fetchRecipes } = require("../utils/apiUtils");

router.get("/recipes/:title", async (req, res) => {
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

module.exports = router;
