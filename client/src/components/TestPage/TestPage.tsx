import React from 'react'
import classes from './TestPage.module.scss'
import {Card} from "components/_shared/Card/Card";
import {Button} from 'components/_shared/Button/Button'
import {Avatar} from 'components/_shared/Avatar/Avatar'
import {Search} from 'react-bootstrap-icons'


const TestPage: React.FC = () => {
    return(

            <div className={classes.wrapper}>
                <div className={classes.column}>
                    <Card>
                        <div className={classes.cardContent}>

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
                                <Button type={'primary'} size={'sm'}><Button.Text>small</Button.Text></Button>
                                <Button type={'primary'} size={'md'}><Button.Text>medium</Button.Text></Button>
                                <Button type={'primary'} size={'lg'}><Button.Text>large</Button.Text></Button>
                            </div>

                            <div>Buttons with icons</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                                <Button type={'primary'} size={'sm'}>
                                    <Button.Icon><Search/></Button.Icon>
                                    <Button.Badge>5</Button.Badge>
                                </Button>
                                <Button type={'primary'} size={'md'}>
                                    <Button.Icon><Search/></Button.Icon>
                                </Button>
                                <Button type={'primary'} size={'lg'}>
                                    <Button.Icon><Search/></Button.Icon>
                                    <Button.Badge>5</Button.Badge>
                                </Button>
                            </div>

                            <div>Button sizes with spinners</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '300px'}}>
                                <Button type={'primary'} size={'sm'} spinner><Button.Text>small</Button.Text></Button>
                                <Button type={'primary'} size={'md'} spinner><Button.Text>medium</Button.Text></Button>
                                <Button type={'primary'} size={'lg'} spinner><Button.Text>large</Button.Text></Button>
                            </div>

                        </div>
                    </Card>
                </div>

                <div className={classes.column}>
                    <Card>
                        <div className={classes.cardContent} style={{display: 'flex', justifyContent: 'space-between'}}>
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