function Task(taskName,taskPriority="", taskDueDate="No due Date", taskDescription=""){
  let _name = taskName;
  let _priority = taskPriority;
  let _dueDate = taskDueDate;
  let _description = taskDescription;
  return Object.assign(TaskMethods(), {_name, _priority, _description, _dueDate,});
}

function TaskMethods(){
  function getName(){
    return this._name;
  }

  function setName(newName){
     this._name = newName;
  }

  function getPriority(){
    return this._priority;
  }

  function setPriority(newPriorityLevel){
    this._priority = newPriorityLevel;
  }

  function getDueDate(){
    return this._dueDate;
  }

  function setDueDate(newDate){
    this._dueDate = newDate;
  }

  function getDescription(){
    return this._description;
  }

  function setDescription(newDescription){
    this._description = newDescription;
  }

 return Object.create({getName, setName, getPriority, setPriority, 
  getDueDate, setDueDate, getDescription, setDescription});
}

export {Task, TaskMethods}