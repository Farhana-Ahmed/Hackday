import "./App.css";
import { useState, useEffect, useCallback } from "react";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import NewRecipeForm from "./components/NewRecipe/NewRecipeForm";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const getResultsFromDb = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/search/${searchTerm}?page=${currentPage}`
      );

      // const recipesFound = results.filter(async (recipe) =>
      //   recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      // );
      const data = await response.json();
      setRecipes(data.data);
      setPagination(data.pagination);
      // if (recipesFound.length > 0) {
      //   console.log("search term is present");
      //   setRecipes(recipesFound);
      // } else {
      //   console.log("No matching recipe found");
      //   setRecipes([]);
      // }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    getResultsFromDb();
  }, [searchTerm, currentPage, getResultsFromDb]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getResultsFromDb();
    // getResultsFromApi();
  };
  const handleNextPage = () => {
    setCurrentPage(pagination.next.page);
  };

  const handlePrevPage = () => {
    setCurrentPage(pagination.prev.page);
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
        <div>
          {pagination.prev && (
            <button onClick={handlePrevPage}>Previous Page</button>
          )}
          {pagination.next && (
            <button onClick={handleNextPage}>Next Page</button>
          )}
        </div>
        <NewRecipeForm />
      </header>
    </div>
  );
}

export default App;
