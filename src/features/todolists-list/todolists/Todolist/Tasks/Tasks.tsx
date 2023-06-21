import {TaskStatuses} from "common/enums";
import {TaskType} from "features/todolists-list/tasks/tasks.api";
import {Task} from "features/todolists-list/todolists/Todolist/Tasks/Task/Task";
import {TodolistDomainType} from "features/todolists-list/todolists/todolists.reducer";
import React, {FC} from "react";

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}
export const Tasks: FC<Props> = ({tasks, todolist}) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <>
            {tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)
            }
        </>
    )
};
