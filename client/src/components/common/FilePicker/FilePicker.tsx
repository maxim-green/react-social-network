import classes from './FilePicker.module.scss'
import React from 'react'
import classNames from 'classnames'

type PropsType = {
    block?: boolean
    label?: string
    setPickedFile?: (file: File) => void
}

const FilePicker: React.FC<PropsType> = (props) => {

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        if (target.files) {
            props.setPickedFile && props.setPickedFile(target.files[0])
        }
    }

    return (
        <div className={classNames(
            classes.input,
            {[classes.block]: props.block},
        )}>
            <div className={classes.info}>
                <div className={classes.label}>{props.label}</div>
            </div>
            <input type="file" accept='.jpg, .png, .jpeg' onChange={onChange}/>
        </div>
    )
}

export default FilePicker