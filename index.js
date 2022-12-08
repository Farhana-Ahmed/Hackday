const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();
const DB = require('./src/utils/db');
const router = require("express").Router()
const recipeService = require('./src/service/recipe-service')
const itemModel = require('./src/models/Recipe');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.get("/", async (req, res) => {
    return res.json({ success: true });
  });

DB.getDBconnection();

//get all recipes
app.get("/recipes" , async(req, res) => {
    const  item = await itemModel.find({});
    res.send(item);
})

//post new recipe
app.post("/recipes" , async(req, res) => {
    const recipe = new itemModel(
        {title:req.body.title,
        ingredients:req.body.ingredients,
        servings:req.body.servings,
        instructions:req.body.instructions})
recipe.save(() => {
    console.log('saved to db')
})
     return res.json(recipe);
})

//get recipe by title
app.get("/recipes/:title" , async(req, res) => {
    const title = req.params.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  itemModel.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      });
    });
})

//update recipe by finding it by id
app.put("/recipes/:id" , async(req, res) => {
    // console.log('this is the body',req)
    if(!req.body) {
        return res.send(400).send({
            message: "body cannot be empty"
        })
    }
    const id = req.params.id;
    itemModel.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message:"recipe not found"});
        }
        else{
             res.send({ message: "recipe was updated successfully." });     
        }
    })
    .catch(err => {
        res.status(500).send({message : 'error updating recipe with id' + id})
    })
})

//delete a recipe by finding by id
app.delete('/recipes/:id' , async(req, res) => {
    const id = req.params.id;
    itemModel.findByIdAndRemove(id)
    .then(data => {
        if(!data) {
            res.status(400).send({message: "some erroe occured"})
        }
        else 
        {
            res.send({message:"recipe deleted successfully"})
        }
    }).
    catch(err => {
        res.status(500).send({message: "recipe is not found with id" + id})
    })
})

  