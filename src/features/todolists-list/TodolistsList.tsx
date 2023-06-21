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
import {todolistsThunks} from './todolists/todolists.reducer'

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {addTodolist, fetchTodolists} = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists({})
    }, [])

    const addTodolistCallback = useCallback((title: string) => {
        addTodolist(title)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <Paper style={{padding: '10px'}}>
                <AddItemForm addItem={addTodolistCallback}/>
            </Paper>
        </Grid>
        <Grid container spacing={3} style={{paddingBottom: '20px'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist todolist={tl} tasks={allTodolistTasks}/>
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
