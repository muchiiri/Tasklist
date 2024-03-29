//Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //load DOM Event
  document.addEventListener("DOMContentLoaded", getTasks);

  //Add task event
  form.addEventListener("submit", addTask);
  //Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear tasks using the clear button
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //create textnode and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link
    const link = document.createElement("a");
    //Add Class
    link.className = "delete-item secondary-content";
    //Add html icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append the li to ul
    taskList.appendChild(li);
  });
}

//Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a Task");
  }

  //Create li element
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link
  const link = document.createElement("a");
  //Add Class
  link.className = "delete-item secondary-content";
  //Add html icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to li
  li.appendChild(link);

  //Append the li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove the item?")) {
      e.target.parentElement.parentElement.remove();
      //Remove from local storage
      removeTaskFromlocalStorage(e.target.parentElement.parentElement);
    }
  }
}
//Remove from LS
function removeTaskFromlocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
  // taskList.innerHTML = "";

  //Alternative method to clear tasks
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
