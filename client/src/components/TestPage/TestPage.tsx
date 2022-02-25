import React from 'react'
import classes from './TestPage.module.scss'
import Form from "components/_shared/Form/Form";
import {Card} from "components/_shared/Card/Card";
import {Input} from 'components/_shared/Input/Input'
import {InputPassword} from 'components/_shared/Input/InputPassword'
import {InputCheckbox} from 'components/_shared/Input/InputCheckbox'
import {InputRange} from 'components/_shared/Input/InputRange'
import {InputDate} from 'components/_shared/Input/InputDate'
import {InputFile} from 'components/_shared/Input/InputFile'
import {Button} from 'components/_shared/Button/Button'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Search} from 'react-bootstrap-icons'


const TestPage: React.FC = () => {
    return(

            <div className={classes.wrapper}>
                <div className={classes.column}>
                    <Card>
                        <div className={classes.cardContent}>
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
                                <Button type={'primary'}><Button.Text>primary</Button.Text></Button>
                                <Button type={'secondary'}><Button.Text>secondary</Button.Text></Button>
                                <Button type={'neutral'}><Button.Text>neutral</Button.Text></Button>
                                <Button type={'text'}><Button.Text>text</Button.Text></Button>
                                <Button type={'cancel'}><Button.Text>Cancel</Button.Text></Button>
                                <Button type={'primary'} disabled><Button.Text>disabled</Button.Text></Button>
                            </div>

                            <div>Button types with spinners</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}}>
                                <Button type={'primary'} spinner><Button.Text>primary</Button.Text></Button>
                                <Button type={'secondary'} spinner><Button.Text>secondary</Button.Text></Button>
                                <Button type={'neutral'} spinner><Button.Text>neutral</Button.Text></Button>
                                <Button type={'text'} spinner><Button.Text>text</Button.Text></Button>
                                <Button type={'cancel'} spinner><Button.Text>cancel</Button.Text></Button>
                            </div>

                            <div>Button sizes</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                                <Button type={'primary'} size={'small'}><Button.Text>small</Button.Text></Button>
                                <Button type={'primary'} size={'medium'}><Button.Text>medium</Button.Text></Button>
                                <Button type={'primary'} size={'large'}><Button.Text>large</Button.Text></Button>
                            </div>

                            <div>Buttons with icons</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                                <Button type={'primary'} size={'small'}>
                                    <Button.Icon><Search/></Button.Icon>
                                    <Button.Badge>5</Button.Badge>
                                </Button>
                                <Button type={'primary'} size={'medium'}>
                                    <Button.Icon><Search/></Button.Icon>
                                </Button>
                                <Button type={'primary'} size={'large'}>
                                    <Button.Icon><Search/></Button.Icon>
                                    <Button.Badge>5</Button.Badge>
                                </Button>
                            </div>

                            <div>Button sizes with spinners</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                                <Button type={'primary'} size={'small'} spinner><Button.Text>small</Button.Text></Button>
                                <Button type={'primary'} size={'medium'} spinner><Button.Text>medium</Button.Text></Button>
                                <Button type={'primary'} size={'large'} spinner><Button.Text>large</Button.Text></Button>
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

                <div className={classes.column}>
                    <Card>
                        <div className={classes.cardContent}>
                            <Avatar
                                smallImg={'https://i.pravatar.cc/300'}
                                largeImg={'https://i.pravatar.cc/600'}
                                online
                                name={'Human One'}
                                size={90}
                                onEdit={() => console.log('Avatar updated.')}
                            />
                            <Avatar
                                smallImg={'https://i.pravatar.cc/300'}
                                online
                                name={'Human One'}
                                size={70}
                                onEdit={() => console.log('Avatar updated.')}
                            />
                            <Avatar
                                smallImg={'https://i.pravatar.cc/300'}
                                online
                                name={'Human One'}
                                size={50}
                                onEdit={() => console.log('Avatar updated.')}
                            />
                            <Avatar
                                smallImg={'https://i.pravatar.cc/300'}
                                online
                                name={'Human One'}
                                size={30}
                                onEdit={() => console.log('Avatar updated.')}
                            />
                        </div>
                    </Card>
                </div>
            </div>

    )
}

export default TestPage