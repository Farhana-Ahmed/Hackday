import React, { useState } from "react";

const NewRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    servings: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Recipe Saved", data);
    } catch (error) {
      console.log("Error savin rcipe ", error);
    }
  };
  return (
    <div>
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
          name="ingredients"
          id="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="servings">Servings:</label>
        <input
          type="text"
          name="servings"
          id="servings"
          value={formData.servings}
          onChange={handleChange}
        />
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          name="instructions"
          id="instructions"
          value={formData.instructions}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
};

export default NewRecipeForm;
