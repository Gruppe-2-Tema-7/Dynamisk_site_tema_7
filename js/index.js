// Select the containers where categories will be displayed
let difficultyContainer = document.querySelector(".grid_1-1");
let cuisineContainer = document.querySelector(".grid_1-1-1");
let mealTypeContainer = document.querySelector(".grid_1-1-1-1");

// Fetch recipe data from the API
fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => categorizeData(data.recipes)); // Extract "recipes" array from the response

function categorizeData(recipes) {
  console.log("Mine data er:", recipes);

  // Get specific categories and get unique values (not repeat)
  // -difficulties
  const uniqueDifficulties = [...new Set(recipes.map((recipe) => recipe.difficulty))];

  // -cuisines
  const allowedCuisines = ["Italian", "Greek", "Mediterranean"];
  const uniqueCuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))].filter((cuisine) => allowedCuisines.includes(cuisine)); //new Set() removes duplicates, ensuring unique value

  // -meal type
  const allowedMealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const uniqueMealTypes = [...new Set(recipes.flatMap((recipe) => recipe.mealType))].filter((mealType) => allowedMealTypes.includes(mealType));

  // Generate HTML
  // - difficulty
  difficultyContainer.innerHTML = uniqueDifficulties
    .map(
      (difficulty) => `
    <a href="product_list.html?difficulty=${difficulty}">
      <img class="icon grow" src="img/index/${difficulty.toLowerCase()}_icon.webp" alt="${difficulty} icon">
      <p>${difficulty}</p>
    </a>
  `
    )
    .join("");

  // - cuisine
  cuisineContainer.innerHTML = uniqueCuisines
    .map(
      (cuisine) => `
    <a href="product_list.html?cuisine=${cuisine}">
      <img class="icon grow" src="img/index/${cuisine.toLowerCase()}_icon.webp" alt="${cuisine} icon">
      <p>${cuisine}</p>
    </a>
  `
    )
    .join("");

  // - meal type
  mealTypeContainer.innerHTML = uniqueMealTypes
    .map(
      (mealType) => `
    <a href="product_list.html?mealType=${mealType}">
      <img class="icon grow" src="img/index/${mealType.toLowerCase()}_icon.webp" alt="${mealType} icon">
      <p>${mealType}</p>
    </a>
  `
    )
    .join("");
}

// Popular recipes: get top 3 (rating in descending order)
const popular = document.querySelector(".popular");

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => mostPopular(data));

function mostPopular(recipes) {
  const topRecipes = recipes.recipes
    .filter((recipe) => ["Italian", "Mediterranean", "Greek"].includes(recipe.cuisine))
    .sort((a, b) => b.rating - a.rating) // Sort by highest rating first
    .slice(0, 3); // Get top 3

  popular.innerHTML = ` 
    <div class="grid_1-1-1 popular-grid">
      ${topRecipes
        .map(
          (recipe) => `
        <div class="popular-item">
          <a href="single_recipe.html?id=${recipe.id}">
            <img class="layer" src="${recipe.image}" alt="${recipe.name}">
            <h3 class="recipe_name">${recipe.name}</h3>
            <p class="rating">Rating: ${recipe.rating} / 5</p>
          </a>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}
