import React from 'react'
import Form from "./_shared/Form/Form";
import Card from "./_shared/Card/Card";
import {Input} from './_shared/Input/Input'
import {InputPassword} from './_shared/Input/InputPassword'
import {InputCheckbox} from './_shared/Input/InputCheckbox'
import {InputRange} from './_shared/Input/InputRange'
import {InputDate} from './_shared/Input/InputDate'
import {InputFile} from './_shared/Input/InputFile'
import Button from './_shared/Button/Button'


const TestPage: React.FC = () => {
    return(

            <div style={{width: '600px', margin: '0 auto'}}>
                <Card>
                    <div style={{padding: '40px'}}>
                        <Form onSubmit={() => console.log('Submit')}>
                            <Form.Row>
                                <Form.Item component={Input} name='email' label='E-mail:' required/>
                                <Form.Item component={Input} name='username' label='Username:' required disabled/>
                            </Form.Row>
                            <Form.Item component={InputPassword} name='name' label='Password:' required/>
                            <Form.Item component={InputCheckbox} name={'rememberMe'} label={'Remember me'} required/>
                            <Form.Item component={InputCheckbox} name={'rememberMe'} label={'Remember me'} disabled/>
                        </Form>

                        <div>Button types</div>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}}>
                            <Button type={'primary'}>primary</Button>
                            <Button type={'secondary'}>secondary</Button>
                            <Button type={'neutral'}>neutral</Button>
                            <Button type={'text'}>text</Button>
                            <Button type={'cancel'}>text</Button>
                            <Button type={'primary'} disabled>Disabled</Button>
                        </div>

                        <div>Button types with spinners</div>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}}>
                            <Button type={'primary'} spinner>primary</Button>
                            <Button type={'secondary'} spinner>secondary</Button>
                            <Button type={'neutral'} spinner>neutral</Button>
                            <Button type={'text'} spinner>text</Button>
                            <Button type={'cancel'} spinner>text</Button>
                        </div>

                        <div>Button sizes</div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                            <Button type={'primary'} size={'small'}>small</Button>
                            <Button type={'primary'} size={'medium'}>medium</Button>
                            <Button type={'primary'} size={'large'}>large</Button>
                        </div>

                        <div>Button sizes with spinners</div>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                            <Button type={'primary'} size={'small'} spinner>small</Button>
                            <Button type={'primary'} size={'medium'} spinner>medium</Button>
                            <Button type={'primary'} size={'large'} spinner>large</Button>
                        </div>

                            <Form.Item name={'zoom'} component={InputRange}/>
                        <Form.Row>
                            <Form.Item name={'date'} component={InputDate} value={new Date()}/>
                        </Form.Row>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}}>
                            <InputFile name={'date'}/>
                        </div>

                    </div>
                </Card>
            </div>

    )
}

export default TestPage