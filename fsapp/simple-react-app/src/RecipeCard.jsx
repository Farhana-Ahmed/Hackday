import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img
        src="https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg"
        alt=""
      />
      <div className="recipe-card-body">
        <h2>{recipe["title"]}</h2>
        <p>{recipe["instructions"]}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
