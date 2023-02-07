import { ProjectProto } from "./project";
import { Todo, TodoProto } from "./todo";

function Storage(){}
// Storage Static methods
Storage.getTodoList = function(){
  const projects = JSON.parse(localStorage.getItem("todoable-list")) || Todo()
  const todoList = Object.assign(TodoProto(), projects);
  todoList.projects = todoList.projects.map(project => Object.assign(ProjectProto(), project));
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

Storage.addTask = function(projectName, taskObj){
  const todoList = Storage.getTodoList();
  todoList.getProject(projectName).addTask(taskObj);
  Storage.saveTodoList(todoList);
}

Storage.deleteTask = function(projectName, taskName){
  const todoList = Storage.getTodoList();
  todoList.getProject(projectName).deleteTask(taskName);
  Storage.saveTodoList(todoList);
}

export {Storage}