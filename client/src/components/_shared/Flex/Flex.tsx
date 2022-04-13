import React from 'react'
import classes from 'components/_shared/Flex/Flex.module.scss'

type RowProps = {
    verticalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    horizontalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    padding?: number | string
    margin?: number | string
    gap?: number
}

export const Row: React.FC<RowProps> = ({
                                            children,
                                            verticalAlign= 'start',
                                            horizontalAlign= 'start',
    padding = 0,
    margin = 0,
    gap = 0
}) => {
    return <div className={classes.row} style={{
        alignItems: 'stretch',
        justifyContent: horizontalAlign,
        padding,
        margin
    }}>
        {/* todo: find a way to identify Space component here to insert a space between two flex items*/}
        {React.Children.map(children, child => <div className={classes.rowItem} style={{
            marginRight: gap,
            justifyContent: verticalAlign
        }}>
            {console.log(child)}
            {child}
        </div>)}
    </div>
}

export const Space: React.FC = () => {
    return <div className={classes.space}></div>
}
Space.displayName = 'Space'

type ColProps = {
    verticalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    horizontalAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
    padding?: number | string
    margin?: number | string
    gap?: number
}

export const Col: React.FC<ColProps> = ({
                                            children,
                                            verticalAlign = 'start',
                                            horizontalAlign = 'start',
                                            padding = 0,
                                            margin = 0,
                                            gap = 0
}) => {
    return <div className={classes.col} style={{
        alignItems: horizontalAlign,
        justifyContent: verticalAlign,
        padding,
        margin,
        gap
    }}>
        {React.Children.map(children, child => <div className={classes.colItem} style={{
            marginBottom: gap,
        }}>
            {child}
        </div>)}
    </div>
}