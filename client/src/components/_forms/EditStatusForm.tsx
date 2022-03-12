import React from 'react'
import {Form} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'

type PropsType = {
    onSubmit: (data: { status: string }) => void
    initialStatus: string
}

//todo: add form control and custom components

const EditStatusForm: React.FC<PropsType> = ({onSubmit, initialStatus}) => {
    return (
        <Form onSubmit={onSubmit} submitOnBlur={true} initialValues={{status: initialStatus}}>
            <InputText name={'status'} autoFocus={true}/>
            {/*<input defaultValue={value} autoFocus onBlur={onBlur} onChange={onChange} onKeyDown={onEnter}/>*/}
        </Form>
    )
}



export default EditStatusForm
