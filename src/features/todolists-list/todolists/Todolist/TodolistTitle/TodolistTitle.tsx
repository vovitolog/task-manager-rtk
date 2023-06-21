import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {EditableSpan} from "common/components";
import {useActions} from "common/hooks";
import {TodolistDomainType, todolistsThunks} from "features/todolists-list/todolists/todolists.reducer";
import React, {FC} from "react";

type Props = {
    todolist: TodolistDomainType
}
export const TodolistTitle: FC <Props> = ({todolist}) => {
    
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)
    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }

    return (
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    )
}
