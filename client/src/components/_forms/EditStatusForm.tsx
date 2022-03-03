import React from 'react'

type PropsType = {
    onBlur: () => void
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

//todo: add form control and custom components

const EditStatusForm: React.FC<PropsType> = ({value, onBlur, onChange, onEnter}) => {
    return (
        <form onSubmit={(e: React.FormEvent) => {e.preventDefault()}}>
            <input defaultValue={value} autoFocus onBlur={onBlur} onChange={onChange} onKeyDown={onEnter}/>
        </form>
    )
}

export default EditStatusForm
