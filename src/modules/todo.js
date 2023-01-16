import { Project } from "./project"

function Todo(){
  let projects = [];
  projects.push(Project("Inbox"));
  projects.push(Project("Today"));
  projects.push(Project("This Week"));
  return Object.assign(TodoProto(), {projects})
}

function TodoProto(){
  function contains(projectName){
    return this.projects.some(project => project.name === projectName);
  }

  function getProject(projectName){
    return this.projects.find(project => project.name === projectName);
}

  function addProject(newProjectName){
    if (this.projects.find(project => project.name === newProjectName )){
         return;
    }
    this.projects.push(newProjectName);
  }

  function deleteProject(projectName){
    const indexOfProject = this.projects.findIndex(project => {
      return project.name === projectName;
    });
        
    if (indexOfProject !== -1){
      this.projects.splice(indexOfProject,1);
    }
  }

  return Object.create({contains, getProject, addProject, deleteProject});
}

export {Todo, TodoProto}