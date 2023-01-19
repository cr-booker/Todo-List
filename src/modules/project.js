import {isToday, isThisWeek,} from 'date-fns'

function Project(projectName){
  let name = projectName;
  let tasks = [];
  return Object.assign(ProjectProto(), {name, tasks});
}

function ProjectProto(){
  function containsTask(taskName){
    return this.tasks.some(task => task.name === taskName);
  }

  function getTask(taskName){
    return this.tasks.find(task => task.name === taskName);
  }

  function addTask(newTaskName){
    if (this.tasks.some(task => task.name === newTaskName )){
      return;
    }
    this.tasks.push(newTaskName);
  }

  function deleteTask(taskName){
    const indexOfTask = this.tasks.findIndex(task => {
      return task.name === taskName;
    });
    
    if (indexOfTask !== -1){
      this.tasks.splice(indexOfTask,1);
    }
  }

  function getTodaysTasks(){
    return this.tasks.filter(task => isToday(task.dueDate));
  }

  function clearAllTasks(){
    this.tasks.length = 0;
  }

  function getWeeksTasks(){
    return this.tasks.filter(task => isThisWeek(task.dueDate));
  }

  return Object.create({containsTask, getTask, addTask, deleteTask, clearAllTasks, getWeeksTasks, getTodaysTasks});
}

export {Project, ProjectProto}