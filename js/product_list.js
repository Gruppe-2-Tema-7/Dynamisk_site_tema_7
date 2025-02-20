const cuisine = new URLSearchParams(window.location.search).get("cuisine");

let endpoint = `https://dummyjson.com/recipes/?limit=50`;
if (cuisine != "All") {
  endpoint = `https://dummyjson.com/recipes/tag/${cuisine}?limit=50`;
}

const productContainer = document.querySelector(".product_list_container");

document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

let allData;

fetch(endpoint)
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
                                <p>${product.tags}</p>
                                <p>${product.difficulty}</p>
                            </div>
                            <div>
                                <p>${product.rating}/5</p>
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
