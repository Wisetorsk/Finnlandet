var sticky;
var navbar;
var blogData;
var blogModeElement;
var rosterModeElement;
var matchResultModeElement;
var newsModeElement;
var tableModeElement;
var articleModeElement;
var resultsTable;
var rosterTable;
var key;
var db;
var mode;
var data = { tabeller: {avdeling1: {}, avdeling2: {}}, articles: [], stats: {}};

readTextFile("key.txt");
var config = {
    apiKey: key,
    authDomain: "fantasyinnlandet-39937.firebaseapp.com",
    databaseURL: "https://fantasyinnlandet-39937.firebaseio.com",
    projectId: "fantasyinnlandet-39937",
    storageBucket: "",
    messagingSenderId: "506940425310"
};

function closeModal() {
  document.getElementById('loadingModal').classList.remove("openModal");
  document.getElementById('loadingModal').classList.add("closeModal");
  setTimeout(function() {
    document.getElementById('loadingModal').classList.add("hidden");
  }, 1000);
  
}

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
  readStats();
}

function generatePreviews() {
  news = [
    document.getElementById('newsElement1'), 
    document.getElementById('newsElement2'),
    document.getElementById('newsElement3')
  ];
  var j = 0;
  for (var article in data.articles) {
    insertPreview(data.articles[article], news[article]);
  }
}

function insertPreview(article, parent) {
  var heading = article.heading;
  var preview_img = article.preview_img;
  var preview_text = article.content.substr(0, 200) + '... Les mer';
  appendElement('div', parent, heading, "newsElementHeader");
  appendElement('img', parent, null, null, preview_img);
  appendElement('div', parent, preview_text, 'newsTextPreview');
}

function readStats() {
  db.collection("statistikker").get().then(function(doc) {
    doc.forEach(function(element) {
      data.stats[element.id] = element.data();
    });
  });
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

function appendElement(type, parent, content=null, rules=null, src=null) {
  if (typeof(parent) != "object") {
    throw "Parent element " + parent + " is not Object!";
  }
  var element = document.createElement(type);
  if (content != null) {
    var text = document.createTextNode(content);
    element.appendChild(text);
  }
  if (rules != null) {
    element.setAttribute('class', rules)
  }
  if (src != null) {
    element.setAttribute('src', src);
  }
  parent.appendChild(element);
  //return parent;
}

function makeTable(data, headers = ["one", "two", "three"]) {
  var table = document.createElement('table');
  for (var h in headers) {
    table.appendElement('th', table)
  }
}

function insertTablesMainpage() {
  var parent1 = document.getElementById('table1');
  var parent2 = document.getElementById('table2');
  insertMiniTable(data.tabeller.avdeling1, parent1);
  insertMiniTable(data.tabeller.avdeling2, parent2);
}

function insertMiniTable(data, parent) {
  for (let team in data) {
    var row = document.createElement('tr');
    appendElement('td', row, data[team].plass);
    appendElement('td', row, team);
    appendElement('td', row, data[team].total.mål);
    appendElement('td', row, data[team].poeng);
    parent.appendChild(row);
  }
}

function readTable(division, dataTable) {
  db.collection("tabeller").doc(division).get().then((questionSnapshot) => {
    for (var key in questionSnapshot.data()) {
      dataTable[key] = questionSnapshot.data()[key];
    }
  });
}

function open_article(element) {
  var wanted_article = element.getAttribute("articleid");
  for (var article of data.articles) {
    if (article.heading == wanted_article) {
      display_article(article);
      break;
    }
  }
}

function display_article(article) {
  // Store and hide previous mode. 
  articleModeElement.innerHTML = "";
  appendElement('img', articleModeElement, null, "mainImg", article.main_img);
  appendElement('div', articleModeElement, article.heading, "articleHeading", null);
  appendElement('div', articleModeElement, article.content, "articleText", null);
  articleMode();
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
  tableModeElement = document.getElementById('tables');
  articleModeElement = document.getElementById('article');
  loadDB();
  setTimeout(function() {
    load_articles();
    insertTables(data.tabeller);
    insertTopResults();
    insertTablesMainpage();
    generatePreviews();
    closeModal();
  }, 1000);
}

function insertTopResults() {
  insertResults(document.getElementById('pointsList'), data.stats.Målgivende);
  insertResults(document.getElementById('raatassen'), data.stats.Råtassen);
  insertResults(document.getElementById('topScorer'), data.stats.Toppscorer);
  insertResults(document.getElementById('pointsList'), data.stats.poengkongen);
}

function insertResults(parent, data) {
  for (var element in data) {
    parent.innerHTML += data[element];
  }
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

function addTableHeader(text, parent, classRule) {
  var header = document.createElement('th');
  var txt = document.createTextNode(text);
  header.appendChild(txt);
  parent.appendChild(header);
  header.setAttribute('class', classRule)
  return parent;
}

function addTableData(text, parent, classRule) {
  var header = document.createElement('td');
  var txt = document.createTextNode(text);
  header.appendChild(txt);
  parent.appendChild(header);
  header.setAttribute('class', classRule)
  return parent;
}

function insertMoreRow(parent) {
  parent = addTableHeader('V', parent, 'narrow');
  parent = addTableHeader('U', parent, 'narrow');
  parent = addTableHeader('T', parent, 'narrow');
  parent = addTableHeader('Mål', parent, 'narrow');
  return parent;
}

function insertTable(data, location) {
  var generated_table = document.createElement('table');
  var topRow = document.createElement('tr');
  topRow = addTableHeader('Plass', topRow, 'wide');
  topRow = addTableHeader('Lag', topRow, 'wide');
  topRow = addTableHeader('Kamper', topRow, 'wide');
  topRow = insertMoreRow(topRow);
  topRow = insertMoreRow(topRow);
  topRow = insertMoreRow(topRow);
  topRow = addTableHeader('Diff', topRow, 'narrow');
  topRow = addTableHeader('Poeng', topRow, 'wide');

  generated_table.appendChild(topRow);

  for (var row in data) {
    var insertRow = document.createElement('tr');
    var teamname = row;
    var results = data[teamname];
    insertRow = addTableData(results.plass, insertRow, 'data');
    insertRow = addTableData(teamname, insertRow, 'data');
    insertRow = addTableData(results.kamper, insertRow, 'data');

    insertRow = addTableData(results.hjemme.v, insertRow, 'data');
    insertRow = addTableData(results.hjemme.u, insertRow, 'data');
    insertRow = addTableData(results.hjemme.t, insertRow, 'data');
    insertRow = addTableData(results.hjemme.mål, insertRow, 'data');

    insertRow = addTableData(results.borte.v, insertRow, 'data');
    insertRow = addTableData(results.borte.u, insertRow, 'data');
    insertRow = addTableData(results.borte.t, insertRow, 'data');
    insertRow = addTableData(results.borte.mål, insertRow, 'data');


    insertRow = addTableData(results.total.v, insertRow, 'data');
    insertRow = addTableData(results.total.u, insertRow, 'data');
    insertRow = addTableData(results.total.t, insertRow, 'data');
    insertRow = addTableData(results.total.mål, insertRow, 'data');
    insertRow = addTableData(results.total.diff, insertRow, 'data'); //diff!

    insertRow = addTableData(results.poeng, insertRow, 'data');

    generated_table.appendChild(insertRow);
  }

  document.getElementById(location).appendChild(generated_table);
}

function insertTables(dataSet) {
  for (var table in dataSet) {
    insertTable(dataSet[table], table);
  }
}

function rosterMode() {
  mode = 'roster';
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.remove("hidden");
  newsModeElement.classList.add("hidden");
  tableModeElement.classList.add("hidden");
  articleModeElement.classList.add("hidden");
}

function matchResultMode() {
  mode = 'result';
  matchResultModeElement.classList.remove("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
  newsModeElement.classList.add("hidden");
  tableModeElement.classList.add("hidden");
  articleModeElement.classList.add("hidden");
}

function blogMode() {
  mode = 'blog';
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.remove("hidden");
  rosterModeElement.classList.add("hidden");
  newsModeElement.classList.add("hidden");
  tableModeElement.classList.add("hidden");
  articleModeElement.classList.add("hidden");
}

function newsMode() {
  mode = 'news';
  newsModeElement.classList.remove("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
  matchResultModeElement.classList.add("hidden");
  tableModeElement.classList.add("hidden");
  articleModeElement.classList.add("hidden");
}

function tableMode(resultTable) {
  mode = 'tables';
  matchResultModeElement.classList.add("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
  newsModeElement.classList.add("hidden");
  tableModeElement.classList.remove('hidden');
  articleModeElement.classList.add("hidden");
  if (resultTable == 'one') {
    document.getElementById('avdeling1').classList.remove('hidden');
    document.getElementById('avdeling2').classList.add('hidden');
  } else {
    document.getElementById('avdeling2').classList.remove('hidden');
    document.getElementById('avdeling1').classList.add('hidden');
  }
}

function articleMode() {
  mode = 'article';
  newsModeElement.classList.add("hidden");
  blogModeElement.classList.add("hidden");
  rosterModeElement.classList.add("hidden");
  matchResultModeElement.classList.add("hidden");
  tableModeElement.classList.add("hidden");
  articleModeElement.classList.remove("hidden");
}