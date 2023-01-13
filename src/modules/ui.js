import { Task } from "./task";
import { Project } from "./project";
import { Todo } from "./todo";
import { Storage } from "./storage";

function UI(){}
  UI.init = function(){
    initProjectBtns()
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
      return
    }
    if (Storage.getTodoList().contains(projectInputContent)){
      projectNameInput.value = "";
      inputErrorMessage.textContent = "Project name already taken.";
      return
    }
    inputErrorMessage.textContent = "";
    Storage.addProject(Project(projectInputContent));
    projectNameInput.value = "";
    createProjectBtn(projectInputContent);
    closeProjectModal();
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
    displayProject(displayNext);
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
      deleteProjectBtn(target);
    }
    else if (target.classList.contains("project")){
      displayProject(target)
    }
  }

  UI. initProjectBtns = function(){
    const showProjectModalBtn = document.querySelector(".new-project-btn");
    showProjectModalBtn.addEventListener("click", showProjectModal);

    const closeProjectModalBtn = document.querySelector(".project-cancel-btn");
    closeProjectModalBtn.addEventListener("click", closeProjectModal);

    const addProjectBtn = document.querySelector(".project-add-btn");
    addProjectBtn.addEventListener("click", addProject);

  const projectsContainer = document.querySelector(".projects-container");
  projectsContainer.addEventListener("click", e => delegateProjects(e.target));
  }
 
