import { TaskProto } from "./task";
import { ProjectProto } from "./project";
import { TodoProto } from "./todo";

function Storage(){
  function getTodoList(){
    const todoList = Object.assign(TodoProto(), JSON.parse(localStorage.getItem("todoable-list")));
    todoList.setProjects(
      todoList.getProjects()
      .map(project => Object.assign(ProjectProto(), project))
      );

    todoList
      .getProjects()
      .forEach(project => 
        project.setTasks(
          project.getTasks().map(task => Object.assign(TaskProto(), task))
        )
      );
    return todoList;
  }

  function saveTodoList(data){
    localStorage.setItem("todoable-list", JSON.stringify(data));
  }

  function addProject(project){
    const todoList = getTodoList();
    todoList.addProject(project);
    saveTodoList(todoList);
  }

  function deleteProject(projectName){
    const todoList = getTodoList();
    todoList.deleteProject(projectName)
    saveTodoList(todoList);
  }

  function addTask(projectName, task){
    const todoList = getTodoList();
    todoList.getProject(projectName).addTask(task);
    saveTodoList(todoList);
  }

  function deleteTask(projectName, task){
    const todoList = getTodoList();
    todoList.getProject(projectName).deleteTask(task);
    saveTodoList(todoList);
  }
  
  return {getTodoList, saveTodoList, addProject,
          deleteProject, addTask, deleteTask}
}

export {Storage}