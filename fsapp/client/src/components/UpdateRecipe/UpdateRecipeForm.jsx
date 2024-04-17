import React, { useState } from "react";
import "./UpdateRecipeForm.css";

const UpdateRecipeForm = ({ recipe, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: recipe.title,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    instrunctions: recipe.instructions,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };
  return (
    <div className="update-recipe-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
        <label htmlFor="servings">Servings:</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
        />
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipeForm;
