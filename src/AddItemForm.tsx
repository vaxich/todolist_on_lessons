import { AddBox } from '@mui/icons-material';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

let styleButton = {
    maxWidth: '38px',
    maxHeight: '38px',
    minWidth: '38px',
    minHeight: '38px'
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState(true);

    const addTaksHandler = () => {
        let trimmedTitle = title.trim();
        if (trimmedTitle !== "") {
            props.addItem(title)
        } else {
            setError(true)
        }

        setTitle("")
    }
    const onChangeHanler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value.trimStart())


    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaksHandler()
        }
    }
    return (
        <div>

            <TextField
                onChange={onChangeHanler}
                onKeyDown={onKeyDownHandler}
                value={title}
                placeholder='start typing'
                id="outlined-basic"
                label="Title"
                helperText={error}
                variant="outlined" />

            <IconButton color={'primary'} onClick={addTaksHandler}>
                <AddBox />
            </IconButton>

        </div>

    )

}

