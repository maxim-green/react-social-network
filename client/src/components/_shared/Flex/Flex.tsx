import React, {CSSProperties} from 'react'
import classes from 'components/_shared/Flex/Flex.module.scss'

type RowProps = {
    children?: Array<React.ReactElement | boolean>
    verticalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    horizontalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    padding?: number | string
    margin?: number | string
    gap?: number
}

export const Row: React.FC<RowProps> = ({
                                            children,
                                            verticalAlign = 'start',
                                            horizontalAlign = 'start',
                                            padding = 0,
                                            gap = 0
                                        }) => {
    return <div className={classes.row} style={{
        alignItems: 'stretch',
        justifyContent: horizontalAlign,
        padding
    }}>
        {children && children.map((child, index) => {
                if (typeof child === 'boolean') return
                return React.cloneElement(child, {
                    key: index,
                    style: {
                        marginRight: (index === children.length - 1) ? 0 : gap,
                        justifyContent: verticalAlign,
                    },
                    className: classes.col
                })
            }
        )}

    </div>
}

type ColProps = {
    verticalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    horizontalAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
    style?: CSSProperties,
    padding?: number | string,
    gap?: number,
}

export const Col: React.FC<ColProps> = ({
                                            children,
                                            style,
                                            verticalAlign,
                                            horizontalAlign = 'start',
                                            padding= 0,
                                            gap = 0

                                        }) => {

    return <div className={classes.col} style={{
        padding,
        marginRight: style?.marginRight,
        alignItems: horizontalAlign,
        justifyContent: verticalAlign ? verticalAlign : style?.justifyContent,
    }}>

        {React.Children.map(children, child => <div className={classes.item} style={{marginBottom: gap}}>
            {child}
        </div>)}
    </div>
}

export const Space: React.FC = () => {
    return <div className={classes.space}/>
}