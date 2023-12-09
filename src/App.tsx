import React, { useState } from 'react'
import './App.css'
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';


export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {

  // local state

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'What to buy', filter: 'All' },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },

    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ]
  })

  // function addTidilist
  const addTodolist = (title: string) => {
    let newTodolistId = v1();
    let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: "All" };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ ...tasks, [newTodolistId]: [] })
  }


  // let [tasks, setTasks] = useState(
  //   [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //     { id: v1(), title: "Rest API", isDone: false },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ]
  // )
  // filter state
  //let [filter, setFilter] = useState<FilterValuesType>("All");



  // function removed one tasks
  const removeTask = (todolistId: string, taskId: string) => {
    // достанем нужный массив по todolistId
    let filteredTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста с отфильтрованным массивом
    tasks[todolistId] = filteredTasks.filter(task => task.id !== taskId)
    // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
    setTasks({ ...tasks })


    //let filteredTasks = tasks.filter(task => task.id !== id);
    //setTasks(filteredTasks);

  }
  // function filtered tasks
  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
    //setFilter(value);
  }
  // function add task
  const addTask = (todolistId: string, title: string) => {

    let task = { id: v1(), title: title, isDone: false }
    // достанем нужный массив по todolistId
    let todolistTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску
    tasks[todolistId] = [task, ...todolistTasks]
    // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
    setTasks({ ...tasks })
    //let newTasks = [task, ...tasks]
    //setTasks(newTasks)
  }
  // function change status
  const changeTaskStatus = (todolistId: string, taskId: string) => {
    // достанем нужный массив по todolistId
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску
    let task = todolistTasks.find(task => task.id === taskId);
    // изменим таску если она нашлась
    if (task) {
      task.isDone = !task.isDone
      // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
      setTasks({ ...tasks })
    }
    //const nextState: Array<TaskType> = tasks.map((task: TaskType) => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
    //setTasks(nextState)
  }
  // function remove todolist
  const removeTodolist = (todolistId: string) => {
    // добавим в стейт список тудулистов, todolistId которых не равны тому, который нужно удалить
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    // удали таски для этого тудулиста из второго стейта, где мы отдельно храним ьаски
    delete tasks[todolistId]
    // засетаем в стейт копию объекта, чтобы реакт отреагировал перерисовкой
    setTasks({ ...tasks })
  }

  return (
    <div className='App'>
      <ButtonAppBar />
      <Container fixed>
        <Grid container  style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container>
          
            {todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id] // здесь храним отфильтрованные таски
              let tasksForTodolist = allTodolistTasks// ??????

              if (tl.filter === "Active") {
                tasksForTodolist = allTodolistTasks.filter(task => task.isDone === false)
              }
              if (tl.filter === "Completed") {
                tasksForTodolist = allTodolistTasks.filter(task => task.isDone === true)
              }
              return (
                <Grid item>
                  <Paper style={{padding: '10px'}}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  addTodolist={addTodolist}
                />
                </Paper>
                </Grid>
              )
            })}
          
        </Grid>

      </Container>
    </div>
  )
}



export default App;
