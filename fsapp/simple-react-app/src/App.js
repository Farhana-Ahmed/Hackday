import "./App.css";
import { useState } from "react";
import RecipeCard from "./RecipeCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getResultsFromDb = async () => {
    try {
      const results = await fetch(
        `http://localhost:3001/api/search/${searchTerm}`,
        { method: "GET" }
      ).then((data) => data.json());

      const recipesFound = results.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (recipesFound.length > 0) {
        console.log("search term is present");
        setRecipes(recipesFound);
      } else {
        console.log("No matching recipe found");
        setRecipes([]);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getResultsFromDb();
    // getResultsFromApi();
  };
  return (
    <div className="app">
      <header className="App-header">
        <h1>Craving for something yummy?😋</h1>
        <form className="app__searchForm" onSubmit={handleSubmit}>
          <input
            className="text-input"
            type="text-input"
            placeholder="search for recipe"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input className="app__submit" type="submit" value="Search" />
        </form>
        <div className="app__recipes">
          {recipes.map((recipe, index) => {
            return <RecipeCard recipe={recipe} key={index} />;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
