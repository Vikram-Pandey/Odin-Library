let library = [];

const btn = document.getElementById("addBookbtn");
const form = document.querySelector("#bookForm");
let k = 0;

function showHideForm() {
  if (btn.innerText == "+") {
    btn.innerText = "x";
    form.classList.remove("hideForm");
    form.classList.add("showForm");
  } else {
    if (btn.innerText == "x") {
      btn.innerText = "+";
      form.classList.remove("showForm");
      form.classList.add("hideForm");
    }
  }
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  let istheBookRead = "";
  if (this.isRead == true) {
    istheBookRead = "is read";
  } else {
    istheBookRead = "is yet to be read";
  }

  return "The ${this.title} by ${this.author} , ${this.pages} pages, ${istheBookRead} ";
};

Book.prototype.toggleReadStatus = function () {
  console.log("toggle");
  if (this.isRead == "Yes") {
    this.isRead = "No";
  } else {
    this.isRead = "Yes";
  }
};

const addBookForm = document.getElementById("bookForm");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

function addBookToLibrary() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("status");

  const bookitem = new Book(
    title.value,
    author.value,
    pages.value,
    status.value
  );

  library.push(bookitem);

  display(k);
  k++;
}

function display(k) {
  for (let i in library) {
    decorate(library[i], k);
    // library.pop(library[i]);
  }
}

function decorate(bookitem, i) {
  const jsonStringObject = JSON.stringify(bookitem);
  const gridContainer = document.querySelector(".grid-container");
  const titleTag = document.createElement("p");
  const strongElementItem = document.createElement("strong");
  strongElementItem.innerText = "Title";
  titleTag.appendChild(strongElementItem);
  titleTag.innerHTML += `: ${bookitem.title}`;
  const authorTag = document.createElement("p");
  authorTag.innerHTML = `Author: ${bookitem.author}`;
  const pagesTag = document.createElement("p");
  pagesTag.innerHTML = `Pages: ${bookitem.pages}`;
  const statusTag = document.createElement("p");
  statusTag.innerHTML = `Status: ${bookitem.isRead}`;

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.setAttribute("class", "toggleButtonClass");
  toggleReadBtn.innerText = "Update";
  toggleReadBtn.setAttribute("onClick", `update(${bookitem.title})`);

  const breakElement = document.createElement("br");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("onClick", `deleteBtn(${i})`);
  deleteButton.setAttribute("class", "deleteButtonClass");
  deleteButton.setAttribute("id", i);
  deleteButton.innerText = "Delete";

  const newdivElement = document.createElement("div");
  newdivElement.className = "card";
  newdivElement.setAttribute("id", i);
  newdivElement.appendChild(titleTag);
  newdivElement.appendChild(authorTag);
  newdivElement.appendChild(pagesTag);
  newdivElement.appendChild(statusTag);
  newdivElement.appendChild(deleteButton);
  newdivElement.appendChild(breakElement);
  newdivElement.appendChild(toggleReadBtn);

  gridContainer.appendChild(newdivElement);
}

function deleteBtn(i) {
  const gContainer = document.querySelector(".grid-container");
  const currentDiv = document.getElementById(i);
  gContainer.removeChild(currentDiv);
}

function update(title) {
  console.log(library);
  //   const bookobj = new Book(
  //     bookitem.title,
  //     bookitem.author,
  //     bookitem.pages,
  //     bookitem.status
  //   );
  //   bookobj.toggleReadStatus();
  //   const divItem = document.getElementById(i);
  //   divItem.children[3].innerText = `Status: ${bookobj.isRead}`;
}
