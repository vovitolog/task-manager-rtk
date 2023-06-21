import {useActions} from "common/hooks";
import React, {FC, memo, useCallback, useEffect} from 'react'
import {AddItemForm} from 'common/components/AddItemForm/AddItemForm'
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {FilterValuesType, TodolistDomainType, todolistsActions, todolistsThunks} from '../todolists/todolists.reducer'
import {Button, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {tasksThunks} from "../tasks/tasks.reducer";
import {TaskStatuses} from "common/enums/common.enums";
import {TaskType} from "features/todolists-list/tasks/tasks.api";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}
export const Todolist: FC<Props> = memo( ({todolist, tasks}) => {

    const {changeTodolistFilter} = useActions(todolistsActions)
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
    const {fetchTasks, addTask} = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = (title: string) => {
        addTask({title, todolistId: todolist.id})
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }

    const onAllClickHandler = useCallback(() => changeTodolistFilter({filter: 'all', id: todolist.id}), [todolist.id])
    const onActiveClickHandler = useCallback(() => changeTodolistFilter({filter: 'active', id: todolist.id}), [todolist.id])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilter({filter: 'completed', id: todolist.id}), [todolist.id])

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


