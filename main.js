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
    loadBlogElements(blogData);
}

function loadJSON() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        blogData = JSON.parse(this.responseText);
        console.log(blogData.blog);
        for (element of blogData.blog) {
            insertBlogElement(element);
        }
    }
};
xmlhttp.open("GET", "blog.json", true);
xmlhttp.send();
}

function loadBlogElements(dataCollection) {
    console.table(dataCollection);
} 

function insertBlogElement(data) {
    let element = document.createElement("div");
    let textBox = document.createElement("div");
    let image = document.createElement("img");
    let textContent = document.createTextNode(data.text);
    let parent = document.getElementById('blogContainer');

    image.src = data.img;
    image.align = data.align;
    element.id = data.id;
    image.width = data.imgW;
    image.height = data.imgH;
    element.classList.add('blogElement');
    textBox.classList.add('blogText');

    textBox.appendChild(textContent);
    element.appendChild(image);
    element.appendChild(textBox);
    parent.appendChild(element);
}