import { ProjectProto } from "./project";
import { TodoProto } from "./todo";

function Storage(){}
  Storage.getTodoList = function(){
    const todoList = Object.assign(TodoProto(), JSON.parse(localStorage.getItem("todoable-list")));
    todoList.projects = todoList.projects.map(project => Object.assign(ProjectProto(), project));
    console.log(todoList.projects)
    return todoList;
  }

  Storage.saveTodoList =  function(data){
    localStorage.setItem("todoable-list", JSON.stringify(data));
  }

  Storage.addProject = function(project){
    const todoList = Storage.getTodoList();
    todoList.addProject(project);
    Storage.saveTodoList(todoList);
  }

  Storage.deleteProject = function(projectName){
    const todoList = Storage.getTodoList();
    todoList.deleteProject(projectName)
    Storage.saveTodoList(todoList);
  }

  Storage.addTask = function(projectName, task){
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).addTask(task);
    Storage.saveTodoList(todoList);
  }

  Storage.deleteTask = function(projectName, task){
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).deleteTask(task);
    Storage.saveTodoList(todoList);
  }

export {Storage}