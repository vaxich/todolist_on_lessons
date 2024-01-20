
import { v1 } from 'uuid'


import { TasksStateType } from '../App'
import { RemoveTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, taskReducer } from './task-reducer'

test('correct task should be deleted from correct array', () => {

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



    const endState = taskReducer(startState, RemoveTaskAC(todolistId2, startState[todolistId2][2].id))
    console.log(endState[todolistId2].length);

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][1].title).toBe('milk')
})

test('correct task should be added to correct array', () => {

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

    const newTitle = 'juce'

    const endState = taskReducer(startState, addTaskAC(todolistId2, newTitle))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe(newTitle)
    expect(endState[todolistId2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
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

    const endState = taskReducer(startState, changeTaskStatusAC(todolistId2, startState[todolistId2][2].id))

    expect(endState[todolistId2][2].isDone).toBe(true)
    expect(endState[todolistId2].length).toBe(3)
})

test('title of specified task should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTitle="new title"

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

    const endState = taskReducer(startState, changeTaskTitleAC(todolistId2, startState[todolistId2][2].id , newTitle))

    expect(endState[todolistId2][2].title).toBe(newTitle)
   
})




