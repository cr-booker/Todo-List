function Task(taskName, taskPriority="", taskDueDate="No due Date", taskDescription=""){
  let name = taskName;
  let priority = taskPriority;
  let dueDate = taskDueDate;
  let description = taskDescription;
  return {name, priority, dueDate, description};
}

export {Task}