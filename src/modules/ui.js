import { Task } from "./task";
import { Project } from "./project";
import { Todo } from "./todo";
import { Storage } from "./storage";

function UI(){}
UI.init = function(){
  UI.loadProjects();
  UI.initProjectBtns();
  UI.initTaskBtns();
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
  const projectModal = document.getElementsByClassName("project-modal")[0];
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
  const userProjects = document.getElementsByClassName("user-projects-container")[0];
  const newProject =  document.createElement("button");
  newProject.classList.add("project", "user-project", "grid-container");
  newProject.type = "button";

  const projectNameContainer = document.createElement("span");
  projectNameContainer.classList.add("user-project-name");
  projectNameContainer.textContent = projectName;

  const delIcon = document.createElement("span");
  delIcon.textContent = `\u00D7`;
  delIcon.classList.add("delete", "delete-project-icon");
  newProject.appendChild(projectNameContainer);
  newProject.appendChild(delIcon);
  userProjects.appendChild(newProject);
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
  const userProjectName = element.firstElementChild;
  const projectHeading = document.getElementById("active-project-name");
  const newTaskBtn = document.querySelector(".new-task-btn");
  projectHeading.textContent = userProjectName ? userProjectName.textContent : element.textContent;
  if (projectHeading.textContent === "Today" || projectHeading.textContent == "This Week"){

    newTaskBtn.classList.add("hidden");
  }
  else{
    newTaskBtn.classList.remove("hidden");
    UI.loadTasks(projectHeading.textContent);
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
UI.loadTasks = function(){
  const taskList = document.querySelector(".task-list");
  const projectName = document.getElementById("active-project-name").textContent;
  taskList.innerHTML = "";
  const project = Storage.getTodoList().getProject(projectName);
  project.tasks.forEach(task => {
    UI.createTask(task);
  })
}

UI.showTaskModal = function(){
  const modal = document.querySelector(".task-modal");
  modal.classList.remove("closed")
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
}

UI.delegateTasks = function(target){
  console.log(target)
  if (target.classList.contains("delete-task-btn")){
    UI.deleteTask(target);
  }
}

UI.initTaskBtns = function(){
  const showTaskModalBtn = document.querySelector(".new-task-btn");
  showTaskModalBtn.addEventListener("click", UI.showTaskModal);

  const closeTaskModalBtn = document.querySelector(".task-cancel-btn");
  closeTaskModalBtn.addEventListener("click", UI.closeTaskModal);

  const addTaskBtn = document.querySelector(".task-add-btn");
  addTaskBtn.addEventListener("click", UI.addTask);

  const taskList = document.querySelector(".task-list");
  taskList.addEventListener("click", e => UI.delegateTasks(e.target))
}
