import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'


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
  addTodolist: (title: string)=> void

}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


function Todolist(props: PropsType) {

  const addTaksHandler = (title: string) => {
    let trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      props.addTask(props.todolistId, title)
    } 
  }
 
  const onChangeFiltetHandler = (todolistId: string, value: FilterValuesType) => {
    props.changeFilter(todolistId, value)
  }
  const removeTodolist = () => {
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
        <EditableSpan  value = {task.title} onChange={addTaksHandler}/>
        <button onClick={removeaskHandler}>✖️</button>
      </li>
    )
  })
    : <span>your task list is empty</span>

  return (
    <div>
      <h3><EditableSpan  value = {props.title} onChange={props.addTodolist}/>
        <button onClick={removeTodolist}>✖️</button>
      </h3>
      <div>
        <AddItemForm  addItem = {addTaksHandler}/>
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