import React from 'react'
import classes from './TestPage.module.scss'
import {Card} from "components/_shared/Card/Card";

import {CForm, CFormRow, Input} from 'components/_shared/CForm/CForm'
import {Button} from 'components/_shared/Button/Button'

export const FormTestPage: React.FC = () => {
    return(

            <div className={classes.wrapper}>
                <div className={classes.column}>

                    <Card>
                        <div className={classes.cardContent}>
                            <CForm onSubmit={data => console.log(data)}>
                                <CFormRow align={'fill'}>
                                    <Input name={'email'} label={'E-mail:'} rules={{required: true}}/>
                                    <Input name={'username'} label={'Username:'} rules={{required: true}}/>
                                </CFormRow>
                                <CFormRow>
                                    <Input name={'password'} label={'Password:'} rules={{required: true}}/>
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