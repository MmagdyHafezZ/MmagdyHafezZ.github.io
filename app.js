(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });

  document
    .querySelector('a[href="#portfolio"]')
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector('.control[data-id="portfolio"]').click();
    });

  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
})();
