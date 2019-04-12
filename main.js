var sticky;
var navbar;
var blogData;
var blogModeElement;
var rosterModeElement;
var matchResultModeElement;
var resultsTable;

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
    loadBlogJSON();
    matchResultModeElement = document.getElementById('matchResults');
    rosterModeElement = document.getElementById('playerRoster');
    blogModeElement = document.getElementById('blogContainer');
    resultsTable = document.getElementById('resultsTable');


}

function loadBlogJSON() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        blogData = JSON.parse(this.responseText);
        for (element of blogData.blog) {
            insertBlogElement(element);
        }
    }
};
xmlhttp.open("GET", "blog.json", true);
xmlhttp.send();
}


function insertBlogElement(data) {
    let element = document.createElement("div");
    let textBox = document.createElement("div");
    let image = document.createElement("img");
    let textContent = document.createTextNode(data.text);
    let parent = document.getElementById('blogContainer');
    let hRule = document.createElement("hr");
    let heading = document.createElement("h3");
    let headerText = document.createTextNode(data.header);
    let figure = document.createElement("figure");
    let imgCaptionText = document.createTextNode(data.caption);
    let caption = document.createElement("figcaption");
    let offsetVertical = parseInt(data.imgH) + 20;
    let offsetHorizontal = parseInt(data.imgW);
    heading.appendChild(headerText);
    heading.classList.add("blogHeader");

    image.src = data.img;
    image.align = data.align;
    element.id = data.id;
    image.width = data.imgW;
    image.height = data.imgH;
    element.classList.add('blogElement');
    textBox.classList.add('blogText');
    figure.classList.add(data.align);

    caption.style.position = "relative";
    caption.style.top = offsetVertical + "px";
    caption.style.fontSize = "12px";

    if(data.align == "left") {
      caption.style.right = offsetHorizontal + "px";
    } else {
      caption.style.left = "50vw";
    }

    caption.appendChild(imgCaptionText);
    figure.appendChild(image);
    figure.appendChild(caption);
    textBox.appendChild(textContent);
    element.appendChild(heading);
    element.appendChild(figure);
    element.appendChild(textBox);
    element.appendChild(hRule);
    parent.appendChild(element);
}

function loadMatchResults() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      blogData = JSON.parse(this.responseText);
      for (element of blogData.blog) {
          insertMatchResult(element);
      }
  }
};
xmlhttp.open("GET", "results.json", true);
xmlhttp.send();
}

function insertMatchResult(result) {

}

function rosterMode() {
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.remove("hidden");
  
}

function matchResultMode() {
  matchResultModeElement.classList.remove("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
}

function blogMode() {
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.remove("hidden");
  rosterModeElement.classList.add("hidden");
}