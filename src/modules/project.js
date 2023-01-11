import {isToday, isThisWeek,} from 'date-fns'

function Project(projectName){
  let name = projectName;
  let tasks = [];
  return Object.assign(ProjectProto(), {name, tasks});
}

function ProjectProto(){
  function getName(){
    return this.name;
  }

  function setName(newName){
    this.name = newName;
  }

  function getTasks(){
    return this.tasks;
  }

  function getTask(taskName){
    return this.tasks.some(task => task.getName() === taskName);
  }

  function setTasks(newTasks){
    this.tasks = newTasks;
  }

  function addTask(newTask){
    if (this.tasks.find(task => task.getName() === newTask.getName() )){
      return;
    }
    this.tasks.push(newTask);
  }

  function deleteTask(taskName){
    const indexOfTask = this.tasks.findIndex(object => {
      return object.getName() === taskName;
    });
    
    if (indexOfTask !== -1){
      this.tasks.splice(indexOfTask,1);
    }
  }

  function getTodaysTasks(){
    return this.tasks.filter(task => isToday(task.getDueDate()));
  }

  function clearAllTasks(){
    this.tasks.length = 0;
  }

  function getWeeksTasks(){
    return this.tasks.filter(task => isThisWeek(task.getDueDate()));
  }

  return Object.create({getName, setName, getTasks, setTasks, getTask, 
    addTask, deleteTask, clearAllTasks, getWeeksTasks, getTodaysTasks});
}

export {Project, ProjectProto}