import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipe.id}`}>
        <img
          src="https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg"
          alt=""
        />
        <div className="recipe-card-body">
          <h2>{recipe["title"]}</h2>
          <p>{recipe["instructions"]}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
