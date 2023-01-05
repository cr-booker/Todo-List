import { Project } from "./project"

function ToDo(){
  const projects = [];
  projects.push(Project("Inbox"));
  projects.push(Project("Today"));
  projects.push(Project("This Week"));


  function getProjects(){
    return projects;
  }

  function getProject(projectName){
    return projects.find(project => project.getName() === projectName);
}

  function setProjects(newProjects){
    projects = newProjects;
  }

  function addProject(newProjectName){
    if (projects.find(project => project.getName() === newProjectName)){
         return;
    }
    projects.push(Project(newProjectName))
  }

  function deleteProject(projectName){
    const indexOfProject = projects.findIndex(project => {
      return project.getName() === projectName;
    });
        
    if (indexOfProject !== -1){
      projects.splice(indexOfProject,1);
    }
  }

  return {getProjects, setProjects, getProject, addProject, deleteProject}
}

export {ToDo}