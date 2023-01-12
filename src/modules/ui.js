import { Task } from "./task";
import { Project } from "./project";
import { Todo } from "./todo";
import { Storage } from "./storage";

function UI(){
  function init(){
    initProjectBtns()
  }
  
  function showProjectModal(){
    const projectModal = document.querySelector(".project-modal");
    projectModal.classList.remove("closed");
  }

  function closeProjectModal(){
    const projectModal = document.getElementsByClassName("project-modal")[0];
    projectModal.classList.add("closed");
  }

  function addProject(){
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
    createProject(projectInputContent);
    closeProjectModal();
  }

  function createProject(projectName){
    const userProjects = document.getElementsByClassName("user-projects-container")[0];
    const newProject =  document.createElement("button");
    newProject.classList.add("project", "user-project", "grid-container");
    newProject.type = "button";

    const projectNameContainer = document.createElement("span");
    projectNameContainer.classList.add("user-project-name");
    projectNameContainer.textContent = projectName;

    const delIcon = document.createElement("span");
    delIcon.textContent = `\u00D7`;
    delIcon.classList.add("delete-project-icon")
    newProject.appendChild(projectNameContainer);
    newProject.appendChild(delIcon);
    userProjects.appendChild(newProject);
  }

  function initProjectBtns(){
    const showProjectModalBtn = document.querySelector(".new-project-btn");
  showProjectModalBtn.addEventListener("click", showProjectModal);

  const closeProjectModalBtn = document.querySelector(".project-cancel-btn");
  closeProjectModalBtn.addEventListener("click", closeProjectModal);

  const addProjectBtn = document.querySelector(".project-add-btn")
  addProjectBtn.addEventListener("click", addProject);
  }
  

}
