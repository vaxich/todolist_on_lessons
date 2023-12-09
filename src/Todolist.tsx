import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button'
import Checkbox from '@mui/material/Checkbox/Checkbox'

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
  addTodolist: (title: string) => void

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

      <div key={task.id} className={taskClass}>
        {/* <input
          type='checkbox'
          checked={task.isDone}
          onChange={onChangeTaskStatusHandler}
        /> */}
        <Checkbox
          checked={task.isDone}
          onChange={onChangeTaskStatusHandler}
        />
        <EditableSpan value={task.title} onChange={addTaksHandler} />
        <IconButton aria-label="delete" onClick={removeaskHandler}>
          <DeleteIcon />
        </IconButton>
        {/* <button onClick={removeaskHandler}>✖️</button> */}
      </div>
    )
  })
    : <span>your task list is empty</span>

  return (
    <div>
      <h3><EditableSpan value={props.title} onChange={props.addTodolist} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
        {/* <button onClick={removeTodolist}>✖️</button> */}
      </h3>
      <div>
        <AddItemForm addItem={addTaksHandler} />
      </div>
      <div>
        {taskList}
      </div>
      <div>
        <Button

          color='primary'
          variant={props.filter === "All" ? "contained" : "outlined"}
          onClick={() => onChangeFiltetHandler(props.todolistId, "All")}>All
        </Button>
        <Button
          color='secondary'
          variant={props.filter === "Active" ? "contained" : "outlined"}
          onClick={() => onChangeFiltetHandler(props.todolistId, "Active")}>Active
        </Button>
        <Button
          color='error'
          variant={props.filter === "Completed" ? "contained" : "outlined"}
          onClick={() => onChangeFiltetHandler(props.todolistId, "Completed")}>Completed
        </Button>
      </div>
    </div>
  )
}

export default Todolist;