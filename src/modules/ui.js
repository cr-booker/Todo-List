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
  const parentNode = element.parentNode;
  const projectName = parentNode.querySelector('.user-project-name').textContent;
  Storage.deleteProject(projectName);
  const displayNext = parentNode.nextElementSibling || parentNode.previousElementSibling || document.getElementById("inbox");
  UI.displayProject(displayNext);
  parentNode.remove();
}

UI.displayProject = function(element){
  const userProjectName = element.firstElementChild;
  const projectHeading = document.getElementById("active-project-name");
  projectHeading.textContent = userProjectName ? userProjectName.textContent : element.textContent;
  UI.loadTasks(projectHeading.textContent);
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
    taskList.appendChild(UI.createTask(task.name));
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
  prioritySelect.value = "Low";
  dueDateInput.value = "";
  descriptionInput.value = "";
  inputErrorMessage.textContent = "";
}

UI.addTask = function(){
  // Tasks field values
  const nameValue = document.getElementById("task-name-input").value.trim();
  const priorityValue = document.getElementById("task-priority-select").value;
  const dueDateValue = document.getElementById("task-duedate-input").value || "No Due Date";
  const descriptionValue = document.getElementById("task-duedate-input").value.trim();

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
  const tasksList = document.querySelector(".task-list");
  tasksList.appendChild(UI.createTask(newTask));
  UI.closeTaskModal();
}

UI.createTask = function(task){
  const listElement = document.createElement("li");
  listElement.classList.add("project-task", "flex-container");
  const taskNameContainer = document.createElement("div");
  taskNameContainer.classList.add("task-left-panel");
  const nameOfTask = document.createElement("p");
  nameOfTask.textContent = task.name;
  taskNameContainer.appendChild(nameOfTask);
  listElement.appendChild(taskNameContainer);
  return listElement;
}

UI.initTaskBtns = function(){
  const showTaskModalBtn = document.querySelector(".new-task-btn");
  showTaskModalBtn.addEventListener("click", UI.showTaskModal);

  const closeTaskModalBtn = document.querySelector(".task-cancel-btn");
  closeTaskModalBtn.addEventListener("click", UI.closeTaskModal);

  const addTaskBtn = document.querySelector(".task-add-btn");
  addTaskBtn.addEventListener("click", UI.addTask);
}

