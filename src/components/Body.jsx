import React from "react"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Body(){
const [recipe, setRecipe] = React.useState("");
const [loading, setLoading] = React.useState(false);
const [error, seterror] = React.useState(null);
    const [ingredients, setingredients] = React.useState([])

    function cleanRecipe(raw) {
  // Remove ```html at start and ``` at end
  return raw.replace(/^```html\s*/i, "").replace(/```$/, "").trim();
}


const IngredientList = ingredients.map((ingredient,index) => 
<li  key= {index} >
    {ingredient.toUpperCase()}<button onClick={() => RemoveItem(index)}><FontAwesomeIcon icon={faTrash}/></button></li>)

   async function fetchRecipes(ingredients) {
  try{ 
    const response = await fetch("https://chef-backend-production.up.railway.app/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })

  })
  

  if(!response.ok){
    const errorData = await response.json().catch(() => ({}));
    throw new Error (errorData.error || "failed to fetch recipes");
  }

   const rawText = await response.text();
    const cleaned = cleanRecipe(rawText);
    return cleaned;
}catch (error){
  console.error("Error fetching recipes:", error);
  throw error;
}
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
                    <button 
                     onClick={ async() => {
              setLoading(true);
              seterror(null);
              try{
                const recipetext = await fetchRecipes(ingredients);
                setRecipe(recipetext);
              }
                catch (error){seterror(error.message) || "failed fetcing ";}
              setLoading(false);
            }}
                    >{ loading ? "loading" : "Get a recipe" }</button>
            </div>}

{recipe && (
  <div response className="recipeResponse">
    <h2>Here Are Some Suggested Secipe from your List Of Ingredients</h2>
  <div dangerouslySetInnerHTML={{ __html: recipe }}></div>
  </div>
)}
{error && <div style={{color: "red"}}>{error}</div>}
        </main>
    )
}