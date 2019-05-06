var sticky;
var navbar;
var blogData;
var blogModeElement;
var rosterModeElement;
var matchResultModeElement;
var newsModeElement;
var resultsTable;
var rosterTable;
var key;
var db;

readTextFile("key.txt");
var config = {
    apiKey: key,
    authDomain: "fantasyinnlandet-39937.firebaseapp.com",
    databaseURL: "https://fantasyinnlandet-39937.firebaseio.com",
    projectId: "fantasyinnlandet-39937",
    storageBucket: "",
    messagingSenderId: "506940425310"
};


function scrollSticky() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function testDB() {
  db.collection("tabeller").doc("avdeling1").get().then((querySnapshot) => {
    console.log(querySnapshot);
  });
}


function init() {
  firebase.initializeApp(config);
  db = firebase.firestore();
  window.onscroll = function() {scrollSticky()};
  navbar = document.getElementById('navbar');
  sticky = navbar.offsetTop;
  matchResultModeElement = document.getElementById('matchResults');
  newsModeElement = document.getElementById('newsWindow');
  rosterModeElement = document.getElementById('playerRoster');
  blogModeElement = document.getElementById('blogContainer');
  resultsTable = document.getElementById('resultsTable');
  rosterTable = document.getElementById('rosterTable');
  //loadBlogJSON();
  //loadMatchResults();
  testDB();
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                key = allText.trim();

            }
        }
    }
    rawFile.send(null);
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

function insertTable(data) {

}

function insertTables(dataSet) {

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
      matchData = JSON.parse(this.responseText);
      buildMatchTable(matchData.results);

  }
};
xmlhttp.open("GET", "results.json", true);
xmlhttp.send();
}

function buildMatchTable(results) {
  var tableContent = '<tr><th>Dato</th><th>Hjemme</th><th>Resultat</th><th>Borte</th></tr>';
  for (result of results) {
    tableContent += '<tr><td>' + result.date + '</td><td>' + result.home + '</td><td>' + result.homeResult + '\t-\t' + result.awayResult + '</td> <td>' + result.away + '</td></tr>';
  }
  resultsTable.innerHTML = tableContent;
}

function rosterMode() {
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.remove("hidden");
  newsModeElement.classList.add("hidden");
}

function matchResultMode() {
  matchResultModeElement.classList.remove("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
  newsModeElement.classList.add("hidden");
}

function blogMode() {
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.remove("hidden");
  rosterModeElement.classList.add("hidden");
  newsModeElement.classList.add("hidden");
}

function newsMode() {
  newsModeElement.classList.remove("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
  matchResultModeElement.classList.add("hidden");
}