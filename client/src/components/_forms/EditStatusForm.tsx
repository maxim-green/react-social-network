import React from 'react'
import {Form} from 'components/_shared/Form/Form'
import {InputText} from 'components/_shared/Input/InputText/InputText'

type PropsType = {
    onSubmit: (data: { status: string }) => void
    initialStatus: string
}

const EditStatusForm: React.FC<PropsType> = ({onSubmit, initialStatus}) => {
    return (
        <Form onSubmit={onSubmit} submitOnBlur={true} initialValues={{status: initialStatus}} submitOnEnter={true}>
            <InputText name={'status'} autoFocus={true}/>
        </Form>
    )
}



export default EditStatusForm
