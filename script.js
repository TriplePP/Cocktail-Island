const submit = document.querySelector(".submit");
const input = document.querySelector("#drink");
const randomBtn = document.querySelector(".btn");
const randomCocktailUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

// Event listeners

//Search for cocktails on click
submit.addEventListener("click", (e) => {
  const apiUrl = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;
  getCocktails(e, apiUrl);
});

// Return random cocktail
randomBtn.addEventListener("click", (e) => getCocktails(e, randomCocktailUrl));

async function getCocktails(e, apiUrl) {
  // Prevent default form submission
  e.preventDefault();
  try {
    const response = await fetch(apiUrl);
    let cocktailInfo = await response.json();

    createHTML(cocktailInfo);
  } catch (err) {
    console.log(err);
  }
}

// Loop through individual ingredients and return as string
function getIngredients(drink) {
  let ingredients = [];
  let num = 1;
  while (drink[`strIngredient${num}`]) {
    ingredients.push(drink[`strIngredient${num}`]);
    num++;
  }
  return ingredients.join(", ");
}

// Compile HTML for each drink
function createHTML(cocktailInfo) {
  const cocktailArr = cocktailInfo.drinks;
  let drinkHTML = "";
  cocktailArr.forEach((drink) => {
    drinkHTML += `
      <div class="drink-wrap form-container container-styling">
        <h2 class="cocktail-name">${drink.strDrink}</h3>
        <div class="drink-details-wrap">
          <img src="${drink.strDrinkThumb}" alt="" class="drink-image" />
          <div class="drink-details">
            <h4 class="alcholic">Alcolic or Non-alcoholic</h4>
            <p>${drink.strAlcoholic}</p>
            <h4 class="glass">Glass type</h4>
            <p>${drink.strGlass}</p>
            <h4 class="ingredients">Ingredients</h5>
            <p>${getIngredients(drink)}</p>
          </div>
        </div>
        <h4>Instructions</h4>
        <p class="instructions">${drink.strInstructions}</p>
      </div>
    `;
    document.querySelector(".cocktail-results").innerHTML = drinkHTML;
  });
}

{
  /* <div class="drink-wrap form-container container-styling">
        <h2 class="cocktail-name">${drink.strDrink}</h3>
        <div class="drink-details-wrap">
          <img src="${drink.strDrinkThumb}" alt="" class="drink-image" />
          <div class="drink-details">
            <h4 class="alcholic">Alcolic or Non-alcoholic</h4>
            <p>${drink.strAlcoholic}</p>
            <h4 class="glass">Glass type</h4>
            <p>${drink.strGlass}</p>
            <h4 class="ingredients">Ingredients</h5>
            <p>${getIngredients(drink)}</p>
          </div>
        </div>
        <h4>Instructions</h4>
        <p class="instructions">${drink.strInstructions}</p>
      </div> */
}
