import React, { useState } from 'react'
import './App.css'
import Todolist from './Todolist';


export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

  // local state
  let[tasks, setTasks] = useState(
    [
      { id: 1, title: "HTML&CSS", isDone: true },
      { id: 2, title: "JS", isDone: true },
      { id: 3, title: "ReactJS", isDone: false },
      { id: 4, title: "Rest API", isDone: false },
      { id: 5, title: "GraphQL", isDone: false },
    ]
  )
  // filter state
  let [filter, setFilter] = useState<FilterValuesType>("All");

  let tasksForTodolist = tasks // здесь храним отфильтрованные таски
  
  if (filter === "Active") {
    tasksForTodolist = tasks.filter( task => task.isDone === false)
  }
  if (filter === "Completed") {
    tasksForTodolist = tasks.filter( task => task.isDone === true)
  }

  // function removed one tasks
  const removeTask = (id: number) => {
    let filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);

  }
  // function filtered tasks
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  }

  return (
    <div className='App'>

      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter = {changeFilter}
      />


    </div>
  )
}



export default App;
