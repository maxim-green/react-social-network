import React from 'react'
import {CForm, InputText} from 'components/_shared/CForm/CForm'

type PropsType = {
    onSubmit: (data: { status: string }) => void
}

//todo: add form control and custom components

const EditStatusForm: React.FC<PropsType> = ({onSubmit}) => {
    return (
        <CForm onSubmit={onSubmit} submitOnBlur={true}>
            <InputText name={'status'} autoFocus={true}/>
            {/*<input defaultValue={value} autoFocus onBlur={onBlur} onChange={onChange} onKeyDown={onEnter}/>*/}
        </CForm>
    )
}



export default EditStatusForm
