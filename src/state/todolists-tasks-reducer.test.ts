import { v1 } from "uuid";
import { TasksStateType, TodolistType } from "../App"
import { taskReducer } from "./task-reducer"
import { AddTodolistAC, RemoveTodolistAC, todolistsReducer } from "./todolists-reducer"


test('property with todolistId should be deleted', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: v1(), title: 'CSS', isDone: false },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: 'bread', isDone: false },
            { id: v1(), title: 'milk', isDone: true },
            { id: v1(), title: 'tea', isDone: false }
        ]
    }

    //const action = RemoveTodolistAC('todolistId2')

    const endState = taskReducer(startState, RemoveTodolistAC(todolistId2))


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('тудулист должен быть добавлен', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState,action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.newTodolistId);
    expect(idFromTodolists).toBe(action.payload.newTodolistId);
})

