const myRecipes = new URLSearchParams(window.location.search).get("recipes");

const productContainer = document.querySelector(".product_list_container");
const overskirft = document.querySelector("h2");

overskirft.innerHTML = myRecipes;

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

let allData;

fetch(`https://dummyjson.com/recipes?limit=50`)
  .then((response) => response.json())
  .then((data) => {
    allData = data.recipes; // Gem opskrifterne i allData
    showList(allData); // Vis opskrifterne
  });

function showList(data) {
  const markup = data
    .map(
      (product) => `

      <div class="product_card">
            <div class="product_card_indhold">
                <a href="single_recipe.html?id=${product.id}">
                    <div>
                        <img src="${product.image}" alt="${product.name}">
                        <p class="product_name">${product.name} </p>
                        <div class="card_text">
                            <div>
                                <p>${product.prepTimeMinutes} min</p>
                            </div>
                            <div>
                                <p>${product.difficulty}</p>
                            </div>
                            <div>
                                <p>${product.rating} *</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    `
    )
    .join("");
  productContainer.innerHTML = markup;
}

function showFiltered() {
  console.log("filter kører");
  const filter = this.dataset.cuisine;
  if (filter == "ALL") {
    showList(allData);
  } else {
    console.log("not all kører");
    let fraction = allData.filter((product) => product.cuisine === filter);
    console.log("allData", allData);
    showList(fraction);
  }
}
