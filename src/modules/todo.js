import { Project } from "./project"

function Todo(){
  let projects = [];
  projects.push(Project("Inbox"));
  projects.push(Project("Today"));
  projects.push(Project("This Week"));
  return Object.assign(TodoProto(), {projects})
}

function TodoProto(){
  function getProjects(){
    return this.projects;
  }

  function getProject(projectName){
    return this.projects.find(project => project.getName() === projectName);
}

  function setProjects(newProjects){
    this.projects = newProjects;
  }

  function addProject(newProject){
    if (this.projects.find(project => project.getName() === newProject.getName() )){
         return;
    }
    this.projects.push(newProject);
  }

  function deleteProject(projectName){
    const indexOfProject = this.projects.findIndex(project => {
      return project.getName() === projectName;
    });
        
    if (indexOfProject !== -1){
      this.projects.splice(indexOfProject,1);
    }
  }

  return Object.create({getProjects, setProjects, getProject, addProject, deleteProject});
}

export {Todo, TodoProto}