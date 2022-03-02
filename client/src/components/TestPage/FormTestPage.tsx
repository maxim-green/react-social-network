import React from 'react'
import classes from './TestPage.module.scss'
import {Card} from "components/_shared/Card/Card";

import {
    CForm,
    CFormRow,
    InputText,
    InputPassword,
    InputTextarea,
    Checkbox,
    InputDate, InputFile, InputRange
} from 'components/_shared/CForm/CForm'
import {Button} from 'components/_shared/Button/Button'

export const FormTestPage: React.FC = () => {
    return(

            <div className={classes.wrapper}>
                <div className={classes.column}>

                    <Card>
                        <div className={classes.cardContent}>
                            <CForm onSubmit={data => console.log(data)}>
                                <CFormRow align={'fill'}>
                                    <InputText name={'email'} label={'E-mail:'} rules={{required: true}}/>
                                    <InputText name={'username'} label={'Username:'} disabled={true}/>
                                </CFormRow>
                                <CFormRow>
                                    <InputPassword name={'password'} label={'Password:'} disabled={true}/>
                                </CFormRow>
                                <CFormRow>
                                    <InputTextarea name={'message'} label={'Message:'} rules={{required: true}}/>
                                </CFormRow>
                                <CFormRow>
                                    <InputDate name={'birthdate'} label={'BirthDate:'} rules={{required: true}}/>
                                </CFormRow>
                                <CFormRow>
                                    <InputFile name={'image'} label={'Dima Loh:'} rules={{required: true}}/>
                                </CFormRow>
                                <CFormRow>
                                    <InputRange name={'size'} label={'Max Krutoy Chelik:'} rules={{required: true}}/>
                                </CFormRow>
                                <CFormRow align={'left'}>
                                    <Checkbox name={'remember'} label={'Remember me:'} />
                                    <Checkbox name={'remember2'} label={'Remember me 2:'} disabled={true}/>
                                </CFormRow>
                                <CFormRow>
                                    <Button>Send</Button>
                                </CFormRow>
                            </CForm>
                        </div>
                    </Card>

                </div>
            </div>

    )
}