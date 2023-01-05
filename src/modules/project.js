import {isToday, isThisWeek,} from 'date-fns'

function Project(projectName){
  
  let _name = projectName;
  let _tasks = [];


  function getName(){
    return _name;
  }

  function setName(newName){
    _name = newName;
  }

  function getTasks(){
    return _tasks;
  }

  function getTask(taskName){
    return _tasks.some(task => task.getName() === taskName);
  }

  function setTasks(newTasks){
    _tasks = newTasks;
  }

  function addTask(newTask){
    if (_tasks.find(task => task.getName() === newTask.getName())){
      return -1;
    }
    _tasks.push(newTask)
  }

  function deleteTask(taskName){
    const indexOfTask = _tasks.findIndex(object => {
      return object.getName() === taskName;
    });
    
    if (indexOfTask !== -1){
      _tasks.splice(indexOfTask,1);
    }
  }

  function getTodaysTasks(){
    return _tasks.filter(task => isToday(task.getDueDate()))
  }

  function getWeeksTasks(){
    return _tasks.filter(task => isThisWeek(task.getDueDate()));
  }

  return {getName, setName, getTasks, setTasks, getTask, 
          addTask, deleteTask, clearAllTasks, getWeeksTasks, 
          getTodaysTasks}
}