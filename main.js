var sticky;
var navbar;
function scrollSticky() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function init() {
    window.onscroll = function() {scrollSticky()};

    navbar = document.getElementById('navbar');
    sticky = navbar.offsetTop;
}

function parseJSON() {
    const filename = "blog.json";
}