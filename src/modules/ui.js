import { Task } from "./task";
import { Project } from "./project";
import { Todo } from "./todo";
import { Storage } from "./storage";

function UI(){}
  UI.init = function(){
    UI.loadProjects();
    UI.initProjectBtns();
  }

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
    projectModal.classList.add("closed");
  }

  UI.addProject = function(){
    const projectNameInput = document.getElementById("project-name-input");
    const inputErrorMessage = document.querySelector(".project-input-error");
    const projectInputContent = projectNameInput.value.trim();
    if (!projectInputContent){
      inputErrorMessage.textContent = "Project name cannot be blank.";
      return;
    }
    if (Storage.getTodoList().contains(projectInputContent)){
      projectNameInput.value = "";
      inputErrorMessage.textContent = "Project name already taken.";
      return;
    }
    inputErrorMessage.textContent = "";
    Storage.addProject(Project(projectInputContent));
    projectNameInput.value = "";
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
    const projectHeading = document.getElementById("project-name");
    projectHeading.textContent = userProjectName ? userProjectName.textContent : element.textContent;
    // loadTasks(projectHeading.textContent);
    }
  

  UI. delegateProjects = function(target){
    if (target.classList.contains("delete")){
      UI.deleteProjectBtn(target);
    }
    else if (target.classList.contains("project")){
      UI.displayProject(target)
    }
  }

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

UI.init()
