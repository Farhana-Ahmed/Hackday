import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.log("Error fetching recipe", error);
      }
    };
    fetchRecipe();
  }, [id]);
  if (!recipe) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
