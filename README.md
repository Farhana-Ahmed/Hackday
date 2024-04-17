# Recipe App

This is a simple Recipe App built with React and Node.js. It allows users to search for recipes, view recipe details, add new recipes, update existing recipes, and delete recipes.

## Features

- Search for recipes by name
- View recipe details, including ingredients and instructions
- Add new recipes to the database
- Update existing recipes with new information
- Delete recipes from the database

## Technologies Used

- Frontend:
  - React
  - React Router for routing
  - React Toastify for toast notifications

- Backend:
  - Node.js with Express for API handling
  - MongoDB for database storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-app.git

## Install dependencies
cd Hackday
cd fsapp 
npm install
cd server ---- npm start to start the server
Open your browser and navigate to http://localhost:3000 to view the app.

Usage
Use the search bar to find recipes by name.
Click on a recipe card to view its details.
Add new recipes using the "Add Recipe" button.
Update or delete existing recipes using the appropriate buttons on the recipe details page.
API Endpoints
GET /api/recipes: Get all recipes
GET /api/recipes/:id: Get recipe by ID
POST /api/recipes: Create a new recipe
PUT /api/recipes/:id: Update recipe by ID
DELETE /api/recipes/:id: Delete recipe by ID
