import { Task } from "./task";
import { Project } from "./project";
import { Todo } from "./todo";
import { Storage } from "./storage";

function UI(){}
UI.init = function(){
  UI.displayProject(document.getElementById("inbox"))
  UI.hideEmptyTaskList();
  UI.loadProjects();
  UI.initProjectBtns();
  UI.initTaskBtns();
}

UI.hideElement = function(elementSelector){
  const element = document.querySelector(elementSelector);
  element.classList.add("hidden");
}

UI.showElement = function(elementSelector){
  const element = document.querySelector(elementSelector);
  element.classList.remove("hidden");
}

// Project Methods
UI.loadProjects = function(){
  const todoList = Storage.getTodoList()["projects"];
  todoList.forEach(project => {
    if (! ["Inbox", "Today", "This Week"].includes(project.name)){
      UI.createProjectBtn(project.name)
    }
  })
}

UI.showProjectModal = function(){
  const projectModal = document.querySelector(".project-modal");
  projectModal.classList.remove("closed");
}

UI.closeProjectModal = function(){
  const projectModal = document.querySelector(".project-modal");
  const projectNameInput = document.getElementById("project-name-input");
  const inputErrorMessage = document.querySelector(".project-input-error");
  projectModal.classList.add("closed");
  projectNameInput.value = "";
  inputErrorMessage.textContent = "";
}

UI.addProject = function(){
  const projectNameInput = document.getElementById("project-name-input");
  const inputErrorMessage = document.querySelector(".project-input-error");
  const projectInputContent = projectNameInput.value.trim();
  if (!projectInputContent){
    inputErrorMessage.textContent = "Project name cannot be blank.";
    return;
  }
  if (Storage.getTodoList().containsProject(projectInputContent)){
    projectNameInput.value = "";
    inputErrorMessage.textContent = "Project name already taken.";
    return;
  }
  Storage.addProject(Project(projectInputContent));
  UI.createProjectBtn(projectInputContent);
  UI.closeProjectModal();
}
  
UI.createProjectBtn = function(projectName){
  const userProjects = document.querySelector(".user-projects-container");
  const newProjectBtn =  document.createElement("button");
  newProjectBtn.classList.add("project", "user-project", "grid-container");
  newProjectBtn.type = "button";

  const projectNameContainer = document.createElement("span");
  projectNameContainer.classList.add("user-project-name");
  projectNameContainer.textContent = projectName;

  const delIcon = document.createElement("span");
  delIcon.textContent = `\u00D7`;
  delIcon.classList.add("delete", "delete-project-icon");
  newProjectBtn.appendChild(projectNameContainer);
  newProjectBtn.appendChild(delIcon);
  userProjects.appendChild(newProjectBtn);
}

UI.deleteProjectBtn = function(element){
  const btnToDelete = element.parentNode;
  const activeproject = document.getElementById("active-project-name").textContent;
  const projectName = btnToDelete.querySelector('.user-project-name').textContent;
  Storage.deleteProject(projectName);
  const displayNext = btnToDelete.nextElementSibling || btnToDelete.previousElementSibling || document.getElementById("inbox");
  if (activeproject == projectName ){
    UI.displayProject(displayNext);
  }
  btnToDelete.remove();
}

UI.displayProject = function(element){
  const currentProjectHeading = document.getElementById("active-project-name");
  const projectToDisplayName = element.firstElementChild ? element.firstElementChild.textContent : element.textContent;
  if (currentProjectHeading.textContent === projectToDisplayName){
    return;
  };

  currentProjectHeading.textContent = projectToDisplayName
  if (projectToDisplayName === "Today" || projectToDisplayName == "This Week"){
    UI.hideElement(".new-task-btn-large");
    UI.hideElement(".new-task-btn-small");
    return;
  }
  else{
    UI.loadTasks(currentProjectHeading.textContent);
  }
}

UI. delegateProjects = function(target){
  if (target.classList.contains("delete")){
    UI.deleteProjectBtn(target);
  }

  else if (target.classList.contains("project")){
    UI.displayProject(target)
  }
}

// Project Event Listeners
// ==========================
UI.initProjectBtns = function(){
  const showProjectModalBtn = document.querySelector(".new-project-btn");
  showProjectModalBtn.addEventListener("click", UI.showProjectModal);

  const closeProjectModalBtn = document.querySelector(".project-cancel-btn");
  closeProjectModalBtn.addEventListener("click", UI.closeProjectModal);

  const addProjectBtn = document.querySelector(".project-add-btn");
  addProjectBtn.addEventListener("click", UI.addProject);

  const projectsContainer = document.querySelector(".projects-container");
  projectsContainer.addEventListener("click", e => UI.delegateProjects(e.target));
}

// Tasks Methods
// ==================
UI.loadTasks = function(){
  const taskList = document.querySelector(".task-list");
  const projectName = document.getElementById("active-project-name").textContent;
  taskList.innerHTML = "";
  const project = Storage.getTodoList().getProject(projectName);
  project.tasks.forEach(task => {
    UI.createTask(task);
  })
  UI.showElement(".new-task-btn-small")
  UI.hideEmptyTaskList();
}

UI.hideEmptyTaskList = function(){
  const taskList = document.querySelector(".task-list");
  if (taskList.childElementCount == 0){
    UI.hideElement(".task-list");
    UI.showElement(".new-task-btn-large");
    UI.hideElement(".new-task-btn-small");
  }
}

UI.showTaskModal = function(){
  const taskModal = document.querySelector(".task-modal");
  taskModal.classList.remove("closed");
}

UI.closeTaskModal = function(){
  const taskModal = document.querySelector(".task-modal");
  const nameInput = document.getElementById("task-name-input");
  const prioritySelect = document.getElementById("task-priority-select");
  const dueDateInput = document.getElementById("task-duedate-input");
  const descriptionInput = document.getElementById("task-duedate-input");
  const inputErrorMessage = document.querySelector(".task-input-error");
  taskModal.classList.add("closed");
  nameInput.value = "";
  prioritySelect.value = "low";
  dueDateInput.value = "";
  descriptionInput.value = "";
  inputErrorMessage.textContent = "";
}

UI.addTask = function(){
  // Tasks field values
  const nameValue = document.getElementById("task-name-input").value.trim();
  const priorityValue = document.getElementById("task-priority-select").value;
  const dueDateValue = document.getElementById("task-duedate-input").value || "No Due Date";
  const descriptionValue = document.getElementById("task-description-input").value.trim();

  const projectName = document.getElementById("active-project-name").textContent;
  const inputErrorMessage = document.querySelector(".task-input-error");
  if (!nameValue){
    inputErrorMessage.textContent = "Task name cannot be blank.";
    return;
  }
  else if (Storage
    .getTodoList()
    .getProject(projectName)
    .containsTask(nameValue)){
    inputErrorMessage.textContent = "Task already in project.";
    return;
  }
  const newTask =  Task(nameValue, priorityValue, dueDateValue, descriptionValue);
  Storage.addTask(projectName, newTask);
  UI.createTask(newTask);
  UI.closeTaskModal();
}

UI.createTask = function(task){
  UI.showElement(".task-list");
  UI.hideElement(".new-task-btn-large");
  UI.showElement(".new-task-btn-small");
  const taskList = document.querySelector(".task-list");
  const projectName = document.getElementById("active-project-name").textContent;
  taskList.innerHTML += `
  <li class="task grid-container">
    <div class="delete-task-btn-container">
      <button type="button" class="delete-task-btn">&#215</button> 
    </div>
    <div class="task-content flex-container">
      <div class="task-name-container flex-container">
        <input class="task-checkbox" id="${projectName}-${task.name}" type="checkbox">
        <label for="task-${task.name}" class="task-label">${task.name}</label>
        <div class="priority ${task.priority}"></div>
      </div>
      <div class="task-details-container flex-container">
        <button type="button" class="task-details-btn">Details</button>
        <p>${task.dueDate}</p>
      </div>
    </div>
  </li>`
}

UI.deleteTask = function(element){
  const taskToDelete = element.parentNode.parentNode;
  const taskName = taskToDelete.querySelector(".task-label").textContent;
  const projectName = document.getElementById("active-project-name").textContent;
  Storage.deleteTask(projectName, taskName);
  taskToDelete.remove();
  UI.hideEmptyTaskList();
}

UI.delegateTasks = function(target){
  if (target.classList.contains("delete-task-btn")){
    UI.deleteTask(target);
  }
}

// Task Event Listeners
// ==========================
UI.initTaskBtns = function(){
  const showTaskModalBtn = document.querySelectorAll(".new-task-btn");
  showTaskModalBtn.forEach(btn => {
    btn.addEventListener("click", UI.showTaskModal)});

  const closeTaskModalBtn = document.querySelector(".task-cancel-btn");
  closeTaskModalBtn.addEventListener("click", UI.closeTaskModal);

  const addTaskBtn = document.querySelector(".task-add-btn");
  addTaskBtn.addEventListener("click", UI.addTask);

  const taskList = document.querySelector(".task-list");
  taskList.addEventListener("click", e => UI.delegateTasks(e.target))
}

export {UI}

