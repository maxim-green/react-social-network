import React from 'react'
import Form, {Button, Checkbox, Input, InputPassword} from "./forms/Form/Form";


const TestPage: React.FC = () => {
    return(
        <div style={{width: '500px', backgroundColor: 'white', padding: '40px'}}>
            <Form onSubmit={() => console.log('Submit')}>
                <Form.Item component={Input} name='email' label='E-mail:' required/>
                <Form.Item component={Input} name='username' label='Username:' required disabled/>
                <Form.Item component={InputPassword} name='name' label='Password:' required/>
                <Form.Item component={Checkbox} name={'rememberMe'} label={'Remember me'} required/>
                <Form.Item component={Checkbox} name={'rememberMe'} label={'Remember me'} disabled/>
            </Form>

            <div>Button types</div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}}>
                <Button type={'primary'}>primary</Button>
                <Button type={'secondary'}>secondary</Button>
                <Button type={'neutral'}>neutral</Button>
                <Button type={'text'}>text</Button>
            </div>

            <div>Button sizes</div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '300px'}}>
                <Button type={'primary'} size={'small'}>small</Button>
                <Button type={'primary'} size={'medium'}>medium</Button>
                <Button type={'primary'} size={'large'}>large</Button>
            </div>

        </div>
    )
}

export default TestPage