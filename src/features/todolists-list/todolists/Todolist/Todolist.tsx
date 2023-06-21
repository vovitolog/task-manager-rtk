import {AddItemForm} from 'common/components/AddItemForm/AddItemForm'
import {useActions} from "common/hooks";
import {TaskType} from "features/todolists-list/tasks/tasks.api";
import {tasksThunks} from "features/todolists-list/tasks/tasks.reducer";
import {FilterTasksButtons} from "features/todolists-list/todolists/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/todolists-list/todolists/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/todolists-list/todolists/Todolist/TodolistTitle/TodolistTitle";
import {TodolistDomainType} from 'features/todolists-list/todolists/todolists.reducer'
import React, {FC, memo, useEffect} from 'react'

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}
export const Todolist: FC<Props> = memo(({todolist, tasks}) => {

    const {fetchTasks, addTask} = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = (title: string) => {
        addTask({title, todolistId: todolist.id})
    }

    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks tasks={tasks} todolist={todolist}/>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    </div>
})


