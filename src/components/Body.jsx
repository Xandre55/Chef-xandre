import React from "react"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Body(){
const [recipe, setRecipe] = React.useState("");
const [loading, setLoading] = React.useState(false);

    const [ingredients, setingredients] = React.useState([])

const IngredientList = ingredients.map((ingredient,index) => 
<li  key= {index} >
    {ingredient.toUpperCase()}<button onClick={() => RemoveItem(index)}><FontAwesomeIcon icon={faTrash}/></button></li>)

   async function fetchRecipes(ingredients) {
  const response = await fetch("http://localhost:3000/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  });

  const recipes = await response.json();
  console.log(recipes); // array of recipes
  return recipes;
}

// Call example


function addIngredient(formData){
    const newIngredient = formData.get("ingredient").trim().toLowerCase()
    const repetition = ingredients.some((ingredient) => ingredient === newIngredient)

    if(repetition){
        alert(` ${newIngredient} already added`)
    } else if(newIngredient){
            setingredients(prevIngredient => [...prevIngredient, newIngredient])
    }
    else{
        alert("insert ingredient")
    }  
}
function RemoveItem(index){
    setingredients(prevIngredient => prevIngredient.filter((_,i) => i != index) )
}
    return (
        <main>
            <div className="formcontainer">
            <form action={addIngredient}
            >
                <input type="text"
                placeholder="add ingredient"
                name="ingredient"
                 /><button> + ADD INGREDIENT</button>
            </form>
            </div>
             <div className="listContainer">
                {IngredientList.length? <ul className="IngredientLists">
                    <h2>Ingredients at Hand:</h2>
                    {IngredientList}
                </ul> : <h2>Add ingredients...</h2>}
            </div> 
           { IngredientList.length > 3 && <div className="recipeContainer">
                    <h3>Ready for some Recipe?</h3>
                    <p>Generate Recipe from your list of ingredients</p>
                    <button onClick={fetchRecipes}>{ loading ? "loading" : "Get a recipe" }</button>
            </div>}

{recipe && (
  <div>
    <h2>Your Recipe</h2>
    <p>{recipe}</p>
  </div>
)}
        </main>
    )
}