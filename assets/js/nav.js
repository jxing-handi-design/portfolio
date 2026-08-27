document.addEventListener("DOMContentLoaded", function () {
  var dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach(function (dd) {
    var toggle = dd.querySelector(":scope > a");
    toggle.addEventListener("click", function (e) {
      // On touch/click devices, first tap opens the menu instead of navigating.
      if (!dd.classList.contains("open")) {
        e.preventDefault();
        dropdowns.forEach(function (o) { o.classList.remove("open"); });
        dd.classList.add("open");
      }
    });
  });

  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dd) {
      if (!dd.contains(e.target)) dd.classList.remove("open");
    });
  });
});
