// Select the containers where categories will be displayed
let difficultyContainer = document.querySelector(".grid_1-1");
let cuisineContainer = document.querySelector(".grid_1-1-1");
let mealTypeContainer = document.querySelector(".grid_1-1-1-1");

// Fetch recipe data from the API
fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => categorizeData(data.recipes)) // Extract the `recipes` array from the response
  .catch((error) => console.error("Error fetching data:", error));

function categorizeData(recipes) {
  console.log("Mine data er:", recipes); // Debugging: Logs fetched data

  // **Get unique difficulties from the recipes**
  const uniqueDifficulties = [...new Set(recipes.map((recipe) => recipe.difficulty))];

  // **Filter allowed cuisines (only Italian, Greek, Mediterranean)**
  const allowedCuisines = ["Italian", "Greek", "Mediterranean"];
  const uniqueCuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))].filter((cuisine) => allowedCuisines.includes(cuisine));

  // **Filter allowed meal types (Breakfast, Lunch, Dinner, Dessert)**
  const allowedMealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const uniqueMealTypes = [...new Set(recipes.flatMap((recipe) => recipe.mealType))].filter((mealType) => allowedMealTypes.includes(mealType));

  // **Generate HTML for Difficulty**
  difficultyContainer.innerHTML = uniqueDifficulties
    .map(
      (difficulty) => `
    <a href="category_list.html?difficulty=${difficulty}">
      <img class="icon" src="img/index/${difficulty.toLowerCase()}_icon.webp" alt="${difficulty} icon">
      <p>${difficulty}</p>
    </a>
  `
    )
    .join("");

  // **Generate HTML for Cuisine**
  cuisineContainer.innerHTML = uniqueCuisines
    .map(
      (cuisine) => `
    <a href="category_list.html?cuisine=${cuisine}">
      <img class="icon" src="img/index/${cuisine.toLowerCase()}_icon.webp" alt="${cuisine} icon">
      <p>${cuisine}</p>
    </a>
  `
    )
    .join("");

  // **Generate HTML for Meal Type**
  mealTypeContainer.innerHTML = uniqueMealTypes
    .map(
      (mealType) => `
    <a href="category_list.html?mealType=${mealType}">
      <img class="icon" src="img/index/${mealType.toLowerCase()}_icon.webp" alt="${mealType} icon">
      <p>${mealType}</p>
    </a>
  `
    )
    .join("");
}
