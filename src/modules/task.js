function Task(taskName,taskPriority="", taskDueDate="No due Date", taskDescription=""){
  let name = taskName;
  let priority = taskPriority;
  let dueDate = taskDueDate;
  let description = taskDescription;
  return Object.assign(TaskProto(), {name, priority, description, dueDate,});
}

function TaskProto(){
  function getName(){
    return this.name;
  }

  function setName(newName){
     this.name = newName;
  }

  function getPriority(){
    return this.priority;
  }

  function setPriority(newPriorityLevel){
    this.priority = newPriorityLevel;
  }

  function getDueDate(){
    return this.dueDate;
  }

  function setDueDate(newDate){
    this.dueDate = newDate;
  }

  function getDescription(){
    return this.description;
  }

  function setDescription(newDescription){
    this.description = newDescription;
  }

 return Object.create({getName, setName, getPriority, setPriority, 
  getDueDate, setDueDate, getDescription, setDescription});
}

export {Task, TaskProto}