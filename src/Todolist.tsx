import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'


type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string) => void
  removeTodolist: (todolistId: string) => void

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
    if (trimmedTitle !== "") {
      props.addTask(props.todolistId, title)
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
  const onChangeFiltetHandler = (todolistId: string, value: FilterValuesType) => {
    props.changeFilter(todolistId, value)
  }
  const removeTodolist =() => {
    props.removeTodolist(props.todolistId)
  }


  let taskList = props.tasks.length ? props.tasks.map((task) => {
    const removeaskHandler = () => props.removeTask(props.todolistId, task.id)
    const onChangeTaskStatusHandler = () => props.changeTaskStatus(props.todolistId, task.id)
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
      <button onClick={removeTodolist}>✖️</button>
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
        <button className={props.filter === "All" ? "btn-filter-active" : undefined} onClick={() => onChangeFiltetHandler(props.todolistId, "All")}>All</button>
        <button className={props.filter === "Active" ? "btn-filter-active" : undefined} onClick={() => onChangeFiltetHandler(props.todolistId, "Active")}>Active</button>
        <button className={props.filter === "Completed" ? "btn-filter-active" : undefined} onClick={() => onChangeFiltetHandler(props.todolistId, "Completed")}>Completed</button>
      </div>
    </div>
  )
}

export default Todolist;