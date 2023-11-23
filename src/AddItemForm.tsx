import React, { ChangeEvent, useState, KeyboardEvent } from 'react'


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState(false);

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
            <input
                onChange={onChangeHanler}
                onKeyDown={onKeyDownHandler}
                value={title}
                placeholder='start typing'
                className={error ? "input-error" : ""}
            />
            <button onClick={addTaksHandler}>+</button>
        </div>

    )

}

