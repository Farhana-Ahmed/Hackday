import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetails.css";
import UpdateRecipeForm from "../UpdateRecipe/UpdateRecipeForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.log("Error fetching recipe", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setRecipe(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error uodating the recipe", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/recipes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("recipe deleted successfully");
        navigate("/");
      } else {
        toast.error("Error deleting recipe");
      }
    } catch (error) {
      console.error("Error deleting the recipe");
      toast.error("Error deleting recipe");
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isEditing ? (
        <UpdateRecipeForm recipe={recipe} onUpdate={handleUpdate} />
      ) : (
        <div className="recipe-card">
          <img
            src="https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg"
            alt=""
          />
          <div className="recipe-card-body">
            <h2>{recipe["title"]}</h2>
            <p>{recipe["instructions"]}</p>
            <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
            <button onClick={handleDelete}>Delete Recipe</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
