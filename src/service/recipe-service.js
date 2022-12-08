const DB = require('../utils/db')

const itemModel = require('../models/Recipe');

exports.create =(req, res) => {
    console.log('this is the request when post is hit' , req)
    const recipe = new itemModel(
        {title:req.body.title,
        ingredients:req.body.ingredients,
        servings:req.body.servings,
        instructions:req.body.instructions})
recipe.save(() => {
    console.log('saved to db')
})
       // itemModel.save(recipe)
       // .then(data => res.send(data))
        //.catch(err => {
           // res.status(500).send({message: 'error occured'});
        //})
}