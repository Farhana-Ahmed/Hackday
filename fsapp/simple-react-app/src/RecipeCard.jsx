import React from 'react'
import './RecipeCard.css';
// import Card from 'react-bootstrap/Card';

const RecipeCard = ({recipe}) => {
  return (
    // <div className='recipeCard'>
    //     <img className='recipeCard__img' src = 'https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg' alt="description"/>
    //   <p className='recipeCard__name'>{ recipe['instructions'] }</p>
    // </div>
// {/* <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg" />
//       <Card.Body style = {{width: ''}}>
//         <Card.Title style={{width: '18rem'}}>{ recipe['title']}</Card.Title>
//         <Card.Text style={{width: '100%'}} >
//         { recipe['instructions'] }
//         </Card.Text>
//       </Card.Body>
//     </Card> */}
<div className="recipe-card">
        <img src="https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg" alt="" />
        <div className="recipe-card-body">
          <h2>{ recipe['title']}</h2>
          <p>
          { recipe['instructions'] }
          </p>
        </div>
      </div>
    
  )
}



export default RecipeCard
