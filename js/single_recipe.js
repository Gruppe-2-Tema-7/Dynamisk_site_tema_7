const one_recipe = document.querySelector(".one_recipe");
const recipeId = new URLSearchParams(window.location.search).get("id");
const navBack = document.querySelector(".back");
const popular = document.querySelector(".popular");

fetch(`https://dummyjson.com/recipes/${recipeId}`)
  .then((response) => response.json())
  .then((data) => showRecipe(data));

function showRecipe(recipe) {
  // <div class="intro_text">
  one_recipe.innerHTML = ` 
    <section class="intro">
        
      <h1>${recipe.name}</h1>
    
      <figure>
      <img class="single_img" src="${recipe.image}" alt="Image of ${recipe.name}"></img>
      </figure> 
    <div class="intro_text">  
      <h3>Difficulty: ${recipe.difficulty}</h3>

      <div>
      <h2>Ingredients</h2>
      <ul>
      ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>  
      </div>
    </div>

    </section>

    <section class="details">    
      <dl>
       <img class="icon" src="img/single_icons/food-preparation.png" alt="food-preparation">
        <dt>Prepping:</dt>
        <dd>${recipe.prepTimeMinutes} min</dd>
      </dl>

      <dl>
        <img class="icon" src="img/single_icons/cooking-pot.png" alt="cooking">
        <dt>Cooking:</dt>
        <dd>${recipe.cookTimeMinutes} min</dd>
      </dl>

      <dl>
        <img class="icon" src="img/single_icons/restaurant.png" alt="serving">
        <dt>Servings:</dt>
        <dd>${recipe.servings}<dd/>
      </dl>

      <dl>
        <img class="icon" src="img/single_icons/star.png" alt="star">
        <dt>Rating:</dt>
        <dd>${recipe.rating} / 5</dd>        
      </dl>
    </section>
  
    <section>
      <h2>Instructions</h2>
      <ol>
      ${recipe.instructions.map((steps) => `<li>${steps}</li>`).join("")}
      </ol>  
    </section>
  `;

  navBack.innerHTML = `<button class="button back_button">Go back</button>`;
  document.querySelector(".back_button").addEventListener("click", () => {
    window.history.back();
  });
}

fetch(`https://dummyjson.com/recipes`)
  .then((response) => response.json())
  .then((data) => mostPopular(data));

function mostPopular(recipes) {
  const topRecipes = recipes.recipes
    .filter((recipe) => ["Italian", "Mediterranean", "Greek"].includes(recipe.cuisine))
    .sort((a, b) => b.rating - a.rating) // arrangere rækkefølgen af opskrifterne fra bedst rating først
    .slice(0, 3); //så der kun er 3

  popular.innerHTML = ` 
    <h2 class="most_popular">Most popular</h2>
    <div class="popular-grid">
      ${topRecipes
        .map(
          (recipe) => `
        <article class="popular-item">
          <a href="single_recipe.html?id=${recipe.id}">
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <dl>
              <dt>Rating:</dt>
              <dd>${recipe.rating} / 5</dd>        
            </dl>          
          </a>
        </article>
      `
        )
        .join("")}
    </div>
  `;
}
