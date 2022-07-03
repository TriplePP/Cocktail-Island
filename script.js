// async function getCocktails() {
//   const apiUrl =
//     "https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
//   try {
//     const response = await fetch(apiUrl);
//     let cocktailInfo = await response.json();
//     loopItems(cocktailInfo);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function loopItems(cocktailInfo) {
//   let num = 1;
//   while (cocktailInfo.drinks[0][`strIngredient${num}`]) {
//     console.log(cocktailInfo.drinks[0][`strIngredient${num}`]);
//     num++;
//   }
// }

// getCocktails();
