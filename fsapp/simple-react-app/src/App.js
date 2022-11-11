import './App.css';
import {  useState} from 'react';
import RecipeCard from './RecipeCard';

function App() {
  const API_KEY = process.env.API_KEY; 
  const [searchTerm , setSearchTerm] = useState('')
  const [recipes , setRecipes] = useState([]);
  
  const getResultsFromDb = async () => {
    const results = await fetch(`http://localhost:3001/recipes/:${searchTerm}`, { method: 'GET' })
        .then(data => data.json())
        for(let i =0; i< results.length ;i++) {
          if(results[i].title.toLowerCase().split(' ').some(term => term === searchTerm)){
          console.log('searchterm is present')
          setRecipes(results) 
          }
        }
        return;
  }
  //else call API as I am doing normally
  const getResultsFromApi = async () => {
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${API_KEY}`,
          'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
        }
      };
  const url = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${searchTerm}&offset=1`;
      await fetch(url, options)
        .then(response => response.json())
        .then(response => setRecipes(response))
        .catch(err => console.error(err));
  }


  const handleSubmit = (e) => {
  e.preventDefault();
  getResultsFromDb();
  getResultsFromApi();
  }
  return (
    <div className="app">
      <header className="App-header">
        <h1>Craving for something yummy?😋</h1>
        <form className="app__searchForm" onSubmit={handleSubmit}>
          <input className="text-input" type = "text-input" placeholder = "search for recipe"
          value = {searchTerm}
          onChange = { (e) => setSearchTerm(e.target.value)}
          />
          <input className='app__submit' type ="submit" value="Search"
           />
        </form>
        <div className='app__recipes'>
      {recipes.map((recipe , index) => {
      return <RecipeCard recipe={recipe} key={index} />;
      })}
        </div>
      </header>
    </div>
  );
}


export default App;
