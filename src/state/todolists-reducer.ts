import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App"

export const todolistsReducer = (state: TodolistType[], action: todolistsReducerType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        } case "ADD-TODOLIST": {
            //let newTodolistId = v1();
            let newTodolist: TodolistType = { id: action.payload.newTodolistId, title: action.payload.title, filter: "All" };
            return [newTodolist, ...state]
        } case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTodolistTitle } : tl)
        } case "CHANGE-TODOLIST-FILTER": {           
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl)
            }
        default: return state
    }

}

type todolistsReducerType = RemoveTodolistACType | AddTodolistACType | ChangheTodolistTitleACType | ChangeTodolistFilerACType

export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type ChangheTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilerACType = ReturnType<typeof ChangeTodolistFilerAC>

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { todolistId }
    } as const
}

export const AddTodolistAC = (title: string) => {
    let newTodolistId = v1();
    return {
        type: "ADD-TODOLIST",
        payload: { title , newTodolistId}
    } as const
}

export const ChangeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: { todolistId, newTodolistTitle }
    } as const
}

export const ChangeTodolistFilerAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: { todolistId, value }
    } as const
}

