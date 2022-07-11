const submitBtn = document.querySelector(".submit");
const input = document.querySelector("#drink");
const randomBtn = document.querySelector(".btn");
const cocktailResults = document.querySelector(".cocktail-results");
const errormMsg = document.querySelector(".error");
const randomCocktailUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";

// EVENT LISTENERS

//Search for cocktails on click
submitBtn.addEventListener("click", (e) => {
  const apiUrl = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${input.value.trim()}`;
  removeErrorMsg();
  getCocktails(e, apiUrl);
});

// Return random cocktail
randomBtn.addEventListener("click", (e) => getCocktails(e, randomCocktailUrl));

// FUNCTIONS

// Remove existing error message if any
function removeErrorMsg() {
  if (errormMsg.textContent) {
    errormMsg.textContent = "";
  }
}

// Get data from API and pass to create HTML function
async function getCocktails(e, apiUrl) {
  // Prevent default form submission
  e.preventDefault();

  try {
    // Raise error if input left blank
    if (!input.value.trim()) {
      throw "Please enter a cocktail name";
    }
    const response = await fetch(apiUrl);
    let cocktailInfo = await response.json();
    createHTML(cocktailInfo);
  } catch (err) {
    // Display error to user
    errormMsg.textContent = err;
  }
}

// Compile HTML for each drink
function createHTML(cocktailInfo) {
  const cocktailArr = cocktailInfo.drinks;
  let drinkHTML = "";
  // Only compile HMTL if valid drink is entered
  try {
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
              <p>${combineIngredientsMeasurements(drink)}</p>
            </div>
          </div>
          <h4>Instructions</h4>
          <p class="instructions">${drink.strInstructions}</p>
        </div>
      `;
      cocktailResults.innerHTML = drinkHTML;
      // Scroll down to loaded content
      window.scroll({
        top: 700,
        left: 0,
        behavior: "smooth",
      });
    });
  } catch (error) {
    // Prompt user to enter another cocktail name if API returns null
    errormMsg.textContent = "Please enter a valid cocktail name";
  }
}

// Create and combine ingredients and measurements arrays into one string and return
function combineIngredientsMeasurements(drink) {
  let ingredients = getArrayDetails(drink, "strIngredient");
  let measurements = getArrayDetails(drink, "strMeasure");
  const combinedArr = ingredients.map((element, index) => {
    return [element, measurements[index]].join(" ");
  });
  return combinedArr.join(", ");
}

// Loop through individual ingredients/measurements and return as an array
function getArrayDetails(drink, key) {
  let arr = [];
  let num = 1;
  while (drink[`${key}${num}`]) {
    arr.push(drink[`${key}${num}`]);
    num++;
  }
  return arr;
}
