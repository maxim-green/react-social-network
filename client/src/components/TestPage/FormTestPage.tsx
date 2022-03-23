import React from 'react'
import classes from './TestPage.module.scss'
import {Card} from "components/_shared/Card/Card";

import {
    Form,
    FormRow
} from 'components/_shared/Form/Form'
import {Button} from 'components/_shared/Button/Button'
import {InputText} from 'components/_shared/Input/InputText/InputText'
import {InputPassword} from 'components/_shared/Input/InputPassword/InputPassword'
import {InputTextarea} from 'components/_shared/Input/InputTextarea/InputTextarea'
import {InputCheckbox} from 'components/_shared/Input/InputCheckbox/InputCheckbox'
import {InputDate} from 'components/_shared/Input/InputDate/InputDate'
import {InputFile} from 'components/_shared/Input/InputFile/InputFile'
import {InputRange} from 'components/_shared/Input/InputRange/InputRange'
import Slider from 'rc-slider'

const FormTestPage: React.FC = () => {
    return(

            <div className={classes.wrapper}>
                <div className={classes.column}>

                    <Card>
                        <div className={classes.cardContent}>
                            <Form onSubmit={data => console.log(data)}>
                                <FormRow align={'fill'}>
                                    <InputText name={'email'} label={'E-mail:'} rules={{required: true}}/>
                                    <InputText name={'username'} label={'Username:'} disabled={true}/>
                                </FormRow>
                                <FormRow>
                                    <InputPassword name={'password'} label={'Password:'} disabled={true}/>
                                </FormRow>
                                <FormRow>
                                    <InputTextarea name={'message'} label={'Message:'} rules={{required: true}}/>
                                </FormRow>
                                <FormRow>
                                    <InputDate name={'birthdate'} label={'BirthDate:'} rules={{required: true}}/>
                                </FormRow>
                                <FormRow>
                                    <InputFile name={'image'} label={'Dima Loh:'} rules={{required: true}}/>
                                </FormRow>
                                <FormRow>
                                    <InputRange min={1}
                                                max={3}
                                                step={0.01} name={'size'} label={'Max Krutoy Chelik:'} rules={{required: true}}/>
                                </FormRow>
                                <FormRow align={'left'}>
                                    <InputCheckbox name={'remember'} label={'Remember me:'} />
                                    <InputCheckbox name={'remember2'} label={'Remember me 2:'} disabled={true}/>
                                </FormRow>
                                <FormRow>
                                    <Button>Send</Button>
                                </FormRow>
                            </Form>
                        </div>
                    </Card>

                </div>
            </div>

    )
}

export default FormTestPage