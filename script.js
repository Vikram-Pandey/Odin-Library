let library = [];

const btn = document.getElementById("addBookbtn");
const form = document.querySelector("#bookForm");

function showHideForm() {
  if (btn.innerText == "+") {
    btn.innerText = "x";
    const gContainer = document.querySelector(".grid-container");
    gContainer.classList.add("hideForm");
    form.classList.remove("hideForm");
    form.classList.add("showForm");
  } else {
    if (btn.innerText == "x") {
      btn.innerText = "+";
      form.classList.remove("showForm");
      form.classList.add("hideForm");
      const gContainer = document.querySelector(".grid-container");
      gContainer.classList.remove("hideForm");
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
  if (this.isRead == "Yes") {
    this.isRead = "No";
  } else {
    this.isRead = "Yes";
  }
};

const addBookForm = document.getElementById("bookForm");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = checkFields();
  if (result == true) {
    showHideForm();
    addBookToLibrary();
    document.getElementById("bookForm").reset();
  }
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

  display();
}

function display() {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = "";
  for (let i in library) {
    decorate(library[i], i);
  }
}

function decorate(bookitem, i) {
  const gridContainer = document.querySelector(".grid-container");

  const titleTag = document.createElement("div");
  const strongTitle = document.createElement("strong");
  strongTitle.innerText = "Title";
  titleTag.appendChild(strongTitle);
  titleTag.innerHTML += `: ${bookitem.title}`;

  const authorTag = document.createElement("div");
  const strongAuthor = document.createElement("strong");
  strongAuthor.innerText = "Author";
  authorTag.appendChild(strongAuthor);
  authorTag.innerHTML += `: ${bookitem.author}`;

  const pagesTag = document.createElement("div");
  const strongPages = document.createElement("strong");
  strongPages.innerText = "Pages";
  pagesTag.appendChild(strongPages);
  pagesTag.innerHTML += `: ${bookitem.pages}`;

  const statusTag = document.createElement("div");
  const strongStatus = document.createElement("strong");
  strongStatus.innerText = "Status";
  statusTag.appendChild(strongStatus);
  statusTag.innerHTML += `: ${bookitem.isRead}`;

  const bookDetailDiv = document.createElement("div");
  bookDetailDiv.appendChild(titleTag);
  bookDetailDiv.appendChild(authorTag);
  bookDetailDiv.appendChild(pagesTag);
  bookDetailDiv.appendChild(statusTag);

  const btns = document.createElement("div");
  btns.setAttribute("class", "delUpBtn");

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.setAttribute("class", "toggleButtonClass");
  toggleReadBtn.innerText = "Update read status";
  toggleReadBtn.setAttribute("onClick", `update(${i})`);

  const breakElement = document.createElement("br");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("onClick", `deleteBtn(${i})`);
  deleteButton.setAttribute("class", "deleteButtonClass");
  deleteButton.setAttribute("id", i);
  deleteButton.innerText = "Delete Book";

  btns.appendChild(toggleReadBtn);
  btns.appendChild(deleteButton);

  const newdivElement = document.createElement("div");
  newdivElement.className = "card";
  if (bookitem.isRead == "Yes") {
    newdivElement.classList.add("statusYes");
    btns.classList.add("statusYes");
    bookDetailDiv.classList.add("statusYes");
  } else {
    newdivElement.classList.add("statusNo");
    btns.classList.add("statusNo");
    bookDetailDiv.classList.add("statusNo");
  }
  newdivElement.setAttribute("id", i);
  newdivElement.appendChild(bookDetailDiv);
  newdivElement.appendChild(btns);

  gridContainer.appendChild(newdivElement);
}

function deleteBtn(i) {
  console.log(i);
  console.log(library);
  const gContainer = document.querySelector(".grid-container");
  const currentDiv = document.getElementById(i);

  for (let k in library) {
    if (k == i) {
      library.splice(k, 1);
    }
  }
  gContainer.removeChild(currentDiv);
}

function update(i) {
  for (let k in library) {
    if (k == i) {
      library[k].toggleReadStatus();
    }
  }

  display();
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const errorTitle = document.getElementById("errorTitle");
const errorAuthor = document.getElementById("errorAuthor");
const errorPages = document.getElementById("errorPages");

function checkFields() {
  let messages = [];

  if (title.value === "" || title.value == null) {
    errorTitle.innerText = "Please provide a title";
    errorTitle.classList.add("showCard");
    errorTitle.classList.remove("hideCard");
    return false;
  } else {
    errorTitle.innerText = "";
    errorTitle.classList.add("hideCard");
    errorTitle.classList.remove("showCard");
  }

  if (author.value === "" || author.value == null) {
    errorAuthor.innerText = "Please provide an author";
    errorAuthor.classList.add("showCard");
    errorAuthor.classList.remove("hideCard");
    return false;
  } else {
    errorAuthor.innerText = "";
    errorAuthor.classList.add("hideCard");
    errorAuthor.classList.remove("showCard");
  }

  if (pages.value == "" || Number(pages.value) == 0) {
    errorPages.innerText =
      "Please provide the pages or add a value greater than 0";
    errorPages.classList.add("showCard");
    errorPages.classList.remove("hideCard");
    return false;
  } else {
    errorPages.innerText = "";
    errorPages.classList.add("hideCard");
    errorPages.classList.remove("showCard");
  }

  return true;
}
