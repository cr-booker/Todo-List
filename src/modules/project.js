import {isToday, isThisWeek,} from 'date-fns'

function Project(projectName){
  let _name = projectName;
  let _tasks = [];
  return Object.assign(ProjectMethods(), {_name, _tasks});
}

function ProjectMethods(){
  function getName(){
    return this._name;
  }

  function setName(newName){
    this._name = newName;
  }

  function getTasks(){
    return this._tasks;
  }

  function getTask(taskName){
    return this._tasks.some(task => task.getName() === taskName);
  }

  function setTasks(newTasks){
    this._tasks = newTasks;
  }

  function addTask(newTask){
    if (this._tasks.find(task => task.getName() === newTask.getName())){
      return -1;
    }
    this._tasks.push(newTask);
  }

  function deleteTask(taskName){
    const indexOfTask = this._tasks.findIndex(object => {
      return object.getName() === taskName;
    });
    
    if (indexOfTask !== -1){
      this._tasks.splice(indexOfTask,1);
    }
  }

  function getTodaysTasks(){
    return this._tasks.filter(task => isToday(task.getDueDate()));
  }

  function clearAllTasks(){
    this._tasks.length = 0;
  }

  function getWeeksTasks(){
    return this._tasks.filter(task => isThisWeek(task.getDueDate()));
  }

  return Object.create({getName, setName, getTasks, setTasks, getTask, 
    addTask, deleteTask, clearAllTasks, getWeeksTasks, getTodaysTasks});
}

export {Project, ProjectMethods}