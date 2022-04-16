import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button} from '../Button'

type PropsType = {
    route?: string
    disabled?: boolean
    onClick?: () => void
}

export const ShowMoreButton: React.FC<PropsType> = ({
                                                        children,
                                                        route,
                                                        disabled }) => {
    return <>
        {!!route && <NavLink to={route} tabIndex={disabled ? -1 : undefined}>
            <Button type={'link'} disabled={disabled}><Button.Text>{children || 'Show more'}</Button.Text></Button>
        </NavLink>}

        {!route && <Button type={'link'} disabled={disabled}>
            <Button.Text>{children || 'Show more'}</Button.Text>
        </Button>}
    </>
}
