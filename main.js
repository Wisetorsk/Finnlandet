var sticky;
var navbar;
var blogData;

var testData = {
    img : "resource/300.jpg",
    align : "left",
    id : "3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum neque vitae nisl pharetra tincidunt. Maecenas felis massa, auctor a lacinia et, volutpat eu lorem. In mattis nisi at mauris feugiat semper. Nulla facilisi. Nam vel purus sodales arcu eleifend hendrerit quis eu nunc. Nullam cursus, enim vitae euismod sollicitudin, neque diam finibus erat, vel consectetur urna sem in leo. Donec varius ut dui sit amet euismod. Donec bibendum pulvinar lectus, vel bibendum nisl finibus ut. Fusce eget dui vestibulum, viverra est vel, dapibus orci. In id consequat tellus. Integer nec tincidunt diam, ut sagittis augue. Phasellus justo neque, auctor in dictum et, scelerisque nec augue. Vestibulum sagittis volutpat rhoncus. Maecenas at convallis felis. Nunc tristique justo dui, ac tempus elit convallis vel. Phasellus lacinia turpis tristique nulla faucibus gravida. Curabitur sit amet bibendum purus. Quisque ut sodales mi, vel euismod libero. Nam pulvinar augue diam, vitae maximus tellus tristique et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu est, porta laoreet luctus dapibus, elementum vel risus. Nulla nibh ante, hendrerit at magna quis, tempus congue diam. Etiam enim diam, tempus id ultricies ac, lacinia id ligula. Etiam scelerisque arcu arcu, id dignissim lacus malesuada vulputate. Sed molestie, diam at auctor convallis, metus ex porttitor odio, eu consectetur velit lectus eu tortor. Suspendisse at ante non tellus pellentesque sodales. Suspendisse mattis, arcu vel semper sagittis, sem ex consequat nisi, nec luctus dui augue in dolor. Ut egestas ipsum in leo finibus laoreet. Praesent et accumsan velit. Pellentesque ac commodo orci. Nulla laoreet porttitor volutpat. Vivamus nisl dolor, finibus at magna et, semper gravida augue. Sed ac iaculis turpis, id maximus felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In rhoncus lacus nec turpis convallis, at aliquam erat malesuada. Donec sit amet ullamcorper magna. Etiam libero lectus, rutrum at tellus at, blandit vulputate nunc. Donec et leo quis felis condimentum finibus. Quisque fringilla mauris sit amet lobortis ultrices. Nam pharetra ultricies tempus. Sed et tellus tellus. Vivamus sit amet tellus diam. Etiam id laoreet massa, pharetra fringilla magna. Vestibulum aliquet leo quis leo vehicula, vel porttitor arcu cursus. Phasellus et laoreet lacus. Sed ante tortor, sagittis in tempor non, porttitor nec neque. Vivamus sed aliquam sem. Mauris quis felis eget libero euismod ornare. Sed sit amet sollicitudin mi. Phasellus ullamcorper accumsan ex, vitae rhoncus purus bibendum sit amet. Maecenas non maximus nisl, ac cursus metus. Curabitur egestas mattis egestas. In ut justo in nulla facilisis blandit quis ut lorem. Aenean suscipit quam ut nisl molestie, laoreet molestie sapien venenatis. Aliquam erat volutpat. Pellentesque placerat leo non lacus finibus gravida. Curabitur volutpat ornare dui, quis viverra quam cursus id. Etiam hendrerit, leo quis condimentum dictum, neque odio ultricies leo, sed placerat massa dui non purus. Suspendisse gravida magna aliquet ex fringilla convallis. Cras elementum euismod sodales."
}

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
    insertBlogElement(testData);
    loadBlogElements(blogData);
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

function loadBlogElements(dataCollection) {
    for (dataBlock of dataCollection) {
        console.table(dataBlock);
    }
} 

function insertBlogElement(data) {
    let element = document.createElement("div");
    let textBox = document.createElement("div");
    let image = document.createElement("img");
    let textContent = document.createTextNode(data.text);
    image.src = data.img;
    image.align = data.align;
    element.id = data.id;
    element.classList.add('blogElement');
    textBox.classList.add('blogText');

    textBox.appendChild(textContent);

    element.appendChild(image);
    element.appendChild(textBox);

    let parent = document.getElementById('blogContainer');

    parent.appendChild(element);
}