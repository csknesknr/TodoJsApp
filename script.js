const form = document.querySelector("form");
const input = document.querySelector("#txt-new-task");
const btnAllDelete = document.querySelector("#btn-delete-all");
const taskList = document.querySelector("#task-list");
//const items = ["item 1", "item 2", "item 3"];
let items;
eventListeners();
loadItems();

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  btnAllDelete.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem("items", JSON.stringify(items));
}

function createItem(text) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = '<i class="fa fa-trash float-end text-danger"></i>';
  li.appendChild(document.createTextNode(text));

  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("Please! Add New İtem");
  }
  createItem(input.value);
  setItemToLS(input.value);
  input.value = "";
  e.preventDefault();
}

function deleteItem(e) {
  if (e.target.className === "fa fa-trash float-end text-danger") {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.remove();

      deleteItemFromLS(e.target.parentElement.textContent);
    }
  }
  e.preventDefault();
}

function deleteAllItems(e) {
  if (confirm("Are you sure ?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
  }
  e.preventDefault();
}
