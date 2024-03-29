const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const recipeRoutes = require("../server/routes/recipeRoutes");
const itemModel = require("../server/models/itemModel");
// const axios = require("axios");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
app.use(cors());

mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.kygbizs.mongodb.net/recipesDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongo Connected successfully");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/recipes/:title", async (req, res) => {
//   try {
//     const options = {
//       method: "GET",
//       url: "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe",
//       params: { query: `${req.params.title}`, offset: "1" },
//       headers: {
//         "X-RapidAPI-Key": `${API_KEY}`,
//         "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
//       },
//     };
//   } catch (err) {}
//   const { query } = options.params;
//   // console.log(query);
//   axios
//     .request(options)
//     .then((response) => {
//       for (let i = 0; i < response.data.length; i++) {
//         let item = new itemModel({
//           title: response.data[i].title,
//           ingredients: response.data[i].ingredients,
//           servings: response.data[i].servings,
//           instructions: response.data[i].instructions,
//         });
//         if (!item.title.includes(query)) {
//           item.save((err, savedItem) => {
//             if (err) {
//               console.log("Error saving item", err);
//             } else {
//               console.log("item saved", savedItem);
//             }
//           });
//         }
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   const item = await itemModel.find({});
//   res.send(item);
// });
app.use("/api", recipeRoutes);
app.listen(port, () => console.log(`Recipe app listening on port ${port}!`));
