import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'


type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter:FilterValuesType
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string) => void

}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


function Todolist(props: PropsType) {

  let [title, setTitle] = useState("");
  let [error, setError] = useState(false);

  const addTaksHandler = () => {
    let trimmedTitle = title.trim();
    if(trimmedTitle !== "") {
      props.addTask(title)
    } else {
      setError(true)
    }
    
    setTitle("")
  }
  const onChangeHanler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(event.currentTarget.value.trimStart())
    
    
  }
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaksHandler()
    }
  }
  const onChangeFiltetHandler = (filterName: FilterValuesType) => {
    props.changeFilter(filterName)
  }
  

  let taskList = props.tasks.length ? props.tasks.map((task) => {
    const removeaskHandler = () => props.removeTask(task.id)
    const onChangeTaskStatusHandler = () => props.changeTaskStatus(task.id)
    const taskClass = task.isDone ? "task-is-done" : "task"
    return (
      <li key={task.id} className={taskClass}>
        <input
          type='checkbox'
          checked={task.isDone}
          onChange={onChangeTaskStatusHandler}
        />
        <span >{task.title}</span>
        <button onClick={removeaskHandler}>✖️</button>
      </li>
    )
  })
    : <span>your task list is empty</span>

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          onChange={onChangeHanler}
          onKeyDown={onKeyDownHandler}
          value={title}
          placeholder='start typing'
          className={error ? "input-error" : ""}
        />
        <button onClick={addTaksHandler}>+</button>
      </div>
      <ul>

        {taskList}

      </ul>
      <div>
        <button className={ props.filter === "All" ? "btn-filter-active" : undefined} onClick={() => onChangeFiltetHandler("All")}>All</button>
        <button className={ props.filter === "Active" ? "btn-filter-active" : undefined}  onClick={() => onChangeFiltetHandler("Active")}>Active</button>
        <button className={ props.filter === "Completed" ? "btn-filter-active" : undefined}  onClick={() => onChangeFiltetHandler("Completed")}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;