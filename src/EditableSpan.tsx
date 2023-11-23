import { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHanler = (event: ChangeEvent<HTMLInputElement>) => {
        // error && setError(false)
        setTitle(event.currentTarget.value.trimStart())


    }

    return (
        <div>
            {
                editMode
                    ? <input value={title} onChange={onChangeHanler} onBlur={activateViewMode} autoFocus/>
                    : <span onDoubleClick={activateEditMode}>{props.value}</span>
            }


        </div>
    )
}