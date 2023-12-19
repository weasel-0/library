"use strict";

const btn = document.querySelector("#modalBtn");
const modal = document.querySelector(".modal");
const close = document.querySelector(".closeform");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const markAsRead = document.querySelector("#markAsRead");
const addBtn = document.querySelector(".addBtn");
const table = document.querySelector("#lib");
const tableBody = document.querySelector("#tableBody");

modal.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  const tbr = formData.has("tbr") ? true : false;
  const book = new Book(
    formDataObj.title,
    formDataObj.author,
    formDataObj.pages,
    formDataObj.tbr
  );
  myLibrary.push(book);
  addToTable();
});

btn.addEventListener("click", function () {
  modal.classList.add("show");
  modal.classList.remove("remove");
});

close.addEventListener("click", function () {
  modal.classList.remove("show");
  modal.classList.add("remove");
});

const myLibrary = [];

function Book(name, author, pages, tbr) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.tbr = tbr;
}

function addToTable() {
  table.getElementsByTagName("tbody")[0].innerHTML = " ";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.name}</td>
     <td>${book.author}</td>
     <td>${book.pages}</td>
    
   <td>   <label class="switch">
   <input type="checkbox" ${book.tbr ? "checked" : ""}>
   <span class="slider"></span>
 </label></td>
     <td><button class="removeEntry" data-index="${index}">Remove</button></td>
    `;
    const remove = row.querySelector(".removeEntry");

    remove.addEventListener("click", function () {
      const bookIndex = this.getAttribute("data-index");
      myLibrary.splice(bookIndex, 1);
      addToTable();
    });
    table.getElementsByTagName("tbody")[0].appendChild(row);
  });

  title.value = "";
  author.value = "";
  pages.value = "";
  markAsRead.checked = false;
}
