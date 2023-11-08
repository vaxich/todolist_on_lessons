import React, { useState } from 'react'
import './App.css'
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

  // local state
  let [tasks, setTasks] = useState(
    [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ]
  )
  // filter state
  let [filter, setFilter] = useState<FilterValuesType>("All");

  let tasksForTodolist = tasks // здесь храним отфильтрованные таски

  if (filter === "Active") {
    tasksForTodolist = tasks.filter(task => task.isDone === false)
  }
  if (filter === "Completed") {
    tasksForTodolist = tasks.filter(task => task.isDone === true)
  }

  // function removed one tasks
  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);

  }
  // function filtered tasks
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  }
  // function add task
  const addTask = (title: string) => {
    let task = { id: v1(), title: title, isDone: false }
    let newTasks = [task, ...tasks]
    setTasks(newTasks)
  }
  // function change status
  const changeTaskStatus = (taskId: string) => {
    const nextState: Array<TaskType> = tasks.map((task: TaskType) => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
    setTasks(nextState)
  }

  return (
    <div className='App'>

      <Todolist
        title="What to learn"
        filter = {filter}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus = {changeTaskStatus}
      />


    </div>
  )
}



export default App;
