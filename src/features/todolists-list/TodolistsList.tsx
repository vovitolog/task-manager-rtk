import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {useActions} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectTodolists} from "features/todolists-list/todolists/todolists.selectors";
import {selectTasks} from "features/todolists-list/tasks/tasks.selectors";
import {todolistsActions, todolistsThunks} from './todolists/todolists.reducer'
import {tasksThunks} from './tasks/tasks.reducer'
import {FilterValuesType} from "features/todolists-list/todolists/todolists.reducer";


export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {
        removeTodolist: removeTodolistThunk,
        addTodolist: addTodolistThunk,
        fetchTodolists,
        changeTodolistTitle: changeTodolistTitleThunk
    } = useActions(todolistsThunks)


    const {addTask: addTaskThunk} = useActions(tasksThunks)
    const {changeTodolistFilter} = useActions(todolistsActions)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists({})
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        addTaskThunk({title, todolistId})
    }, [])

    const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
        changeTodolistFilter({id, filter})
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        removeTodolistThunk(id)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        changeTodolistTitleThunk({id, title})
    }, [])

    const addTodolist = useCallback((title: string) => {
        addTodolistThunk(title)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <Paper style={{padding: '10px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Paper>
        </Grid>
        <Grid container spacing={3} style={{paddingBottom: '20px'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
