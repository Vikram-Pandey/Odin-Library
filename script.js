let library = [];

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
  display();
}

function display() {
  for (let i in library) {
    decorate(library[i]);
    library.pop(library[i]);
  }
}

function decorate(bookitem) {
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

  const newdivElement = document.createElement("div");
  newdivElement.className = "card";
  newdivElement.appendChild(titleTag);
  newdivElement.appendChild(authorTag);
  newdivElement.appendChild(pagesTag);
  newdivElement.appendChild(statusTag);

  gridContainer.appendChild(newdivElement);
}
