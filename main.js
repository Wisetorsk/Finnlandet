var sticky;
var navbar;
var blogData;
function scrollSticky() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function init() {
    window.onscroll = function() {scrollSticky()};

    navbar = document.getElementById('navbar');
    sticky = navbar.offsetTop;
    loadJSON();
}

function loadJSON() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        blogData = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", "blog.json", true);
xmlhttp.send();
}

function parseJSON() {
    const filename = "blog.json";
    let result = JSON.parse
}