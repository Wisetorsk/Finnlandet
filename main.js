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
var data = { tabeller: {avdeling1: {}, avdeling2: {}}, articles: [] };

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

function loadDB() {
  readTable("avdeling1", data.tabeller.avdeling1);
  readTable("avdeling2", data.tabeller.avdeling2);
  readArticles();
  /*db.collection("tabeller").doc("avdeling1").get().then((questionSnapshot) => {
    for (var key in questionSnapshot.data()) {
      data.tabeller.avdeling1[key] = questionSnapshot.data()[key];
    }
  });*/

}

function readArticles() {
  db.collection("articles").get().then(function(doc) {
    doc.forEach(function(element) {
      data.articles.push({
        content: element.data()["content"],
        heading: element.data()["heading"],
        main_img: element.data()["main_img"],
        preview_img: element.data()["preview_img"]
      })
   })
  })
}

function readTable(division, dataTable) {
  db.collection("tabeller").doc(division).get().then((questionSnapshot) => {
    for (var key in questionSnapshot.data()) {
      dataTable[key] = questionSnapshot.data()[key];
    }
  });
}

function open_article(element) {

}

function add_data(collection, document, data) {
  db.collection(collection).doc(document).set(data, {merge: true});
}

function add_article(article) {
  let articleElement = document.createElement("div");
  let headerElement = document.createElement("div");
  let textElement = document.createElement("div");//PREVIEW!!!!!!
  let imgElement = document.createElement("img");

  let preview = "";
  textElement.setAttribute("class", "newsPreview");
  headerElement.setAttribute("class", "newsHeader");
  articleElement.setAttribute("class", "newsHolder wrapper");
  articleElement.setAttribute("articleID", article["heading"]);
  articleElement.setAttribute("onclick", "open_article(this)");

  imgElement.setAttribute("src", article.preview_img);
  imgElement.setAttribute("class", "newsPreviewImage");
  if (article.content.length > 350) {
    preview = article.content.substr(0, 350) + "...";
  } else {
    preview = article.content + "...";
  }
  headerElement.appendChild(document.createTextNode(article["heading"]));
  textElement.appendChild(document.createTextNode(preview));
  articleElement.appendChild(imgElement);
  articleElement.appendChild(headerElement);
  articleElement.appendChild(textElement);
  newsModeElement.appendChild(articleElement);
}

function load_articles() {
  for (articleObj of data.articles) {
    add_article(articleObj);
  }
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
  loadDB();
  console.log(data);
  setTimeout(function() {load_articles()}, 1000);
  //add_article(data.articles[0]);
  //insertArticles();
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


function insertTable(data) {

}

function insertTables(dataSet) {

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