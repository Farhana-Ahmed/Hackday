const express = require("express");
const router = express.Router();
require("dotenv").config();

const axios = require("axios");
const itemModel = require("../models/itemModel");
const API_KEY = process.env.API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
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

    const savedItems = response.data.map(async (recipe) => {
      const item = new itemModel({
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        servings: recipe.servings,
      });

      if (!item.title.includes(query)) {
        try {
          const savedRecipe = await item.save();
          console.log("Item saced");
        } catch (error) {
          console.log("error saving recipe", error);
        }
      }
    });

    await Promise.all(savedItems);

    const items = await itemModel.find({});
    res.send(items);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server erro");
  }
});

//search endpoint
router.get("/search/:title", async (req, res) => {
  try {
    const searchQuery = req.params.title;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalItems = await itemModel.countDocuments({
      title: { $regex: new RegExp(searchQuery, "i") },
    });
    const recipes = await itemModel
      .find({
        title: { $regex: new RegExp(searchQuery, "i") },
      })
      .limit(limit)
      .skip(startIndex);

    const pagination = {};

    if (endIndex < totalItems) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // const recipesWithImages = await Promise.all(
    //   recipes.map(async (recipe) => {
    //     const imageRes = await axios.get(
    //       `https://api.unsplash.com/photos/random?query=${recipe.title}&count=1&client_id=${UNSPLASH_KEY}`
    //     );

    //     const imageUrl =
    //       imageRes.data[0].urls.regular ||
    //       "https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg";

    //     return {
    //       ...recipe.toObject(),
    //       imageUrl,
    //     };
    //   })
    // );

    res.json({ pagination, data: recipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//posting a new recipe

router.post("/recipes", async (req, res) => {
  console.log("THIS IS GETTING HIT");
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

//GET a specific recipe by ID
router.get("/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await itemModel.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID", error);
    res.status(500).json({ error: "Internal server error " });
  }
});

//updating a recipe by ID
router.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, servings, ingredients, instructions } = req.body;

    const updatedRecipe = await itemModel.findByIdAndUpdate(
      id,
      { title, ingredients, servings, instructions },
      { new: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe", error);
    res.status(500).json({ error: "Error updating recipe" });
  }
});
module.exports = router;
