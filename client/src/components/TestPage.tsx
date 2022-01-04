import React from 'react'
import Form, {Button, InputCheckbox, Input, InputPassword, InputRange, InputDate, InputFile} from "./forms/Form/Form";
import Card from "./common/Card/Card";

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

                        <div>Button sizes</div>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '300px'}}>
                            <Button type={'primary'} size={'small'}>small</Button>
                            <Button type={'primary'} size={'medium'}>medium</Button>
                            <Button type={'primary'} size={'large'}>large</Button>
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