import React from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
const Home = ({ recipes }) => {
  return (
    <div>
      <h1>Welcome to the Recipe App</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
