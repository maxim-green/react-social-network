import React, {CSSProperties} from 'react'
import classes from 'components/_shared/Flex/Flex.module.scss'
import classnames from 'classnames'

type RowProps = {
    children?: Array<React.ReactElement | boolean> | React.ReactElement | boolean
    verticalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    horizontalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    padding?: number | string
    margin?: number | string
    gap?: number
    bordered?: boolean
}

export const Row: React.FC<RowProps> = ({
                                            children,
                                            verticalAlign = 'start',
                                            horizontalAlign = 'start',
                                            padding = 0,
                                            gap = 0,
                                            bordered
                                        }) => {
    return <div
        className={classnames(
            classes.row,
            {[classes.bordered]: bordered})
        }
        style={{
            alignItems: 'stretch',
            justifyContent: horizontalAlign,
            padding
        }}
    >
        {(children instanceof Array) && children.map((child, index) => {
                if (typeof child === 'boolean') return false
                return React.cloneElement(child, {
                    key: index,
                    style: {
                        marginRight: (index === children.length - 1) ? 0 : gap,
                        justifyContent: verticalAlign
                    },
                    className: child.props.className + ' ' + classes.col
                })
            }
        )}

        {children && typeof children !== 'boolean' && !(children instanceof Array) &&
            React.cloneElement(children, {
                style: {
                    marginRight: 0,
                    justifyContent: verticalAlign
                },
                className: children.props.className + ' ' + classes.col
            })
        }
    </div>
}

type ColProps = {
    verticalAlign?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    horizontalAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
    style?: CSSProperties,
    padding?: number | string,
    gap?: number,
    bordered?: boolean,
    stretch?: boolean,
}

export const Col: React.FC<ColProps> = ({
                                            children,
                                            style,
                                            verticalAlign,
                                            horizontalAlign = 'start',
                                            padding = 0,
                                            gap = 0,
                                            bordered,
    stretch= false
                                        }) => {

    return <div className={classnames(classes.col, {[classes.bordered]: bordered})} style={{
        padding,
        marginRight: style?.marginRight,
        alignItems: horizontalAlign,
        justifyContent: verticalAlign ? verticalAlign : style?.justifyContent,
        flex: stretch ? 1 : undefined
    }}>

        {React.Children.map(children, child => <div className={classes.item} style={{marginBottom: gap}}>
            {child}
        </div>)}
    </div>
}

export const Space: React.FC = () => {
    return <div className={classes.space}/>
}
