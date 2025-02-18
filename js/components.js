/**** BURGERMENU **** */
document.getElementById("burgerMenu").addEventListener("click", function () {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active"); // Skift mellem visning og skjulning

  // Skift burger-menuens udseende
  const burger = document.getElementById("burgerMenu");
  burger.classList.toggle("open"); // Skift burger-menuen til kryds
});
