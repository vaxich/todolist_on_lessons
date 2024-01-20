
import { v1 } from "uuid"
import { TasksStateType, TodolistType } from "../App"
import { TaskType } from "../Todolist"
import { AddTodolistACType, RemoveTodolistACType } from "./todolists-reducer"

export const taskReducer = (state: TasksStateType, action: taskReducerType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {            
            return {...state,
                [action.payload.todolistId]:state[action.payload.todolistId].filter( task => task.id !== action.payload.taskId)}            
        } 
        case "ADD-TASK": {
            let newTask = { id: v1(), title: action.payload.newTitle, isDone: false }
            return {...state,
                [action.payload.todolistId]:[newTask, ...state[action.payload.todolistId]] 
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, 
                [action.payload.todolistId] : state[action.payload.todolistId].map( task => task.id === action.payload.taskId ? {...task, isDone:!task.isDone} : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, 
                [action.payload.todolistId] : state[action.payload.todolistId].map( task => task.id === action.payload.taskId ? {...task, title:action.payload.newTitle} : task)
            }
        }
        case "ADD-TODOLIST":{
            return { ...state, [action.payload.newTodolistId]: [] }
        }
        case "REMOVE-TODOLIST": {
            let copyState = state
            delete copyState[action.payload.todolistId]
            return copyState
        }
                default: return state
    }

}

type taskReducerType = RemoveTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { todolistId , taskId}
    } as const
}

export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: { todolistId , newTitle}
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: { todolistId , taskId}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { todolistId , taskId, newTitle}
    } as const
}

