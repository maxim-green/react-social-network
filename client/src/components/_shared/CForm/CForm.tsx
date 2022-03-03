import React, {useCallback, useState} from 'react'
import classes from './CForm.module.scss'
import classnames from 'classnames'
import {Controller, RegisterOptions, useForm} from 'react-hook-form'
import {LoginDataType} from 'api/auth.api'
import {Control} from 'react-hook-form/dist/types/form'
import {FieldError} from 'react-hook-form/dist/types'
import DatePicker from 'react-datepicker'
import {useDropzone} from 'react-dropzone'
import Slider from 'rc-slider'
import {Area, Point} from 'react-easy-crop/types'
import Cropper from 'react-easy-crop'


type FormPropsType = {
    onSubmit: (data: any) => void
    initialValues?: { [key: string]: any }
}
export const CForm: React.FC<FormPropsType> = ({
                                                   onSubmit,
                                                   children,
                                                   initialValues
                                               }) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            ...initialValues
        }
    })

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {control})
        }
        return child
    })

    const submit = (formData: LoginDataType) => onSubmit(formData)

    return <form className={classes.wrapper} onSubmit={handleSubmit(submit)}>
        {childrenWithProps}
    </form>
}


type RowPropsType = {
    control?: Control,
    align?: 'fill' | 'left' | 'right' | 'center'
}
export const CFormRow: React.FC<RowPropsType> = ({
                                                     children,
                                                     control,
                                                     align = 'fill'
                                                 }) => {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {control, align})
        }
        return child
    })

    return <div className={classnames(
        classes.row,
        {[classes[align]]: align}
    )}>
        {childrenWithProps}
    </div>
}


type ItemPropsType = {
    label?: string,
    labelPosition?: 'top' | 'left' | 'right'
    required?: boolean,
    disabled?: boolean,
    error?: FieldError,
    align?: 'fill' | 'left' | 'right' | 'center'
}
export const Item: React.FC<ItemPropsType> = ({
                                                  children,
                                                  label,
                                                  labelPosition = 'top',
                                                  required = false,
                                                  disabled = false,
                                                  error, align = 'fill'
                                              }) => {
    return <label className={classnames(classes.item, {[classes[labelPosition]]: labelPosition})}>
        <div className={classnames(classes.label, {[classes.disabled]: disabled})}>
            {required && <span className={classes.labelRequired}>*</span>}
            <span className={classes.labelText}>{label}</span>
            {error?.type === 'required' && <span className={classes.formItemError}>This field is required</span>}
        </div>
        {children}
    </label>
}


type InputTextPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    disabled?: boolean
}
export const InputText: React.FC<InputTextPropsType> = ({
                                                            name,
                                                            label,
                                                            rules,
                                                            control,
                                                            disabled = false
                                                        }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <input
                type={'text'}
                className={`${classes.input} ${fieldState.error ? classes.error : ''}`}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
            />
        </Item>}
    />
}


type InputPasswordPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    disabled?: boolean
}
export const InputPassword: React.FC<InputPasswordPropsType> = ({
                                                                    name,
                                                                    label,
                                                                    rules,
                                                                    control,
                                                                    disabled = false
                                                                }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <input
                type={'password'}
                className={`${classes.input} ${fieldState.error ? classes.error : ''}`}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
            />
        </Item>}
    />
}


type InputTextareaPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}
export const InputTextarea: React.FC<InputTextareaPropsType> = ({
                                                                    name,
                                                                    label,
                                                                    rules,
                                                                    control,
                                                                    rows = 2,
                                                                    disabled = false
                                                                }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <textarea
                className={`${classes.textarea} ${fieldState.error ? classes.error : ''}`}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                rows={rows}
                disabled={disabled}
            />
        </Item>}
    />
}


type CheckboxPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}
export const Checkbox: React.FC<CheckboxPropsType> = ({
                                                          name,
                                                          label,
                                                          rules,
                                                          control,
                                                          disabled = false
                                                      }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               labelPosition='right' disabled={disabled}>
            <div className={classes.checkbox}>
                <input
                    type="checkbox"
                    name={name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={disabled}
                />
                <span className={classes.box}/>
            </div>
        </Item>}
    />
}


type CustomDatePickerType = { value: Date, onChange: (date: Date) => void }
const CustomDatePicker: React.FC<CustomDatePickerType> = ({value, onChange}) => {
    const [date, setDate] = useState<Date>(value ? new Date(value) : new Date())
    const changeHandler = (date: Date) => {
        onChange(date)
        setDate(date)
    }

    return <DatePicker dateFormat="dd.MM.yyyy" calendarStartDay={1} selected={date} onChange={changeHandler}/>
}
type InputDatePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}
export const InputDate: React.FC<InputDatePropsType> = ({
                                                            name,
                                                            label,
                                                            rules,
                                                            control,
                                                            disabled = false
                                                        }) => {


    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <div className={classes.input}>
                <CustomDatePicker value={field.value} onChange={field.onChange}/>
            </div>
        </Item>}
    />
}


export const CustomInputFile: React.FC<{ onChange: (file: File) => void }> = (({
                                                                                   onChange
                                                                               }) => {
    const onDrop = useCallback(acceptedFiles => {
        onChange && onChange(acceptedFiles[0])
    }, [onChange])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className={classes.inputFile + (isDragActive ? ' ' + classes.dragActive : '')} {...getRootProps()}>
            <input {...getInputProps()}/>
            {
                isDragActive ?
                    <span className={classes.inputFileBox}>Drop your files here...</span> :
                    <span className={classes.inputFileBox}>Drop your files here or click to select files</span>
            }
        </div>
    )
})
type InputFilePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean,
    onChange?: (file: File) => void
}
export const InputFile: React.FC<InputFilePropsType> = ({
                                                            name,
                                                            label,
                                                            rules,
                                                            control,
                                                            disabled = false,
                                                            onChange
                                                        }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => {
            const handleChange = (file: File) => {
                onChange && onChange(file)
                field.onChange(file)
            }
            return <Item label={label} required={!!rules?.required} error={fieldState.error}
                         disabled={disabled}>
                <CustomInputFile onChange={handleChange}/>
            </Item>
        }}
    />
}


type InputImageCropPropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    aspect?: number,
    srcFileUrl: string
    disabled?: boolean,
    onChange?: (crop: Area) => void
}
export const InputImageCrop: React.FC<InputImageCropPropsType> = ({
                                                                      name,
                                                                      label,
                                                                      rules,
                                                                      control,
                                                                      disabled = false,
                                                                      onChange,
                                                                      aspect = 1,
                                                                      srcFileUrl
                                                                  }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => {
            const handleChange = (crop: Area) => {
                onChange && onChange(crop)
                field.onChange(crop)
            }
            return <Item label={label} required={!!rules?.required} error={fieldState.error}
                         disabled={disabled}>
                <ImageCrop aspect={aspect} srcFileUrl={srcFileUrl}
                           onChange={field.onChange}/>
            </Item>
        }}
    />
}
type ImageCropPropsType = {
    aspect: number
    srcFileUrl?: string
    onChange?: (value: Area) => void
}
const ImageCrop: React.FC<ImageCropPropsType> = ({aspect, srcFileUrl, onChange}) => {
    const [zoom, setZoom] = useState<number>(1)
    const [crop, setCrop] = useState<Point>({
        x: 0,
        y: 0
    } as Point)

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        onChange && onChange(croppedAreaPixels)
    }

    const sliderChangeHandler = (value: number) => {
        setZoom(value)
    }
    return (
        <div className={classes.imageCrop}>
            <div className={classes.cropperContainer}>
                {srcFileUrl && <Cropper
                    image={srcFileUrl}
                    crop={crop}
                    zoom={zoom}
                    showGrid={false}
                    aspect={aspect}
                    onCropComplete={onCropComplete}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                />}
            </div>
            <div style={{width: '100%'}}>
                Use this slider to zoom your image
                <Slider
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={sliderChangeHandler}
                />
            </div>
        </div>
    )
}


type InputRangePropsType = {
    name: string,
    label?: string,
    rules?: RegisterOptions,
    control?: Control,
    rows?: number,
    disabled?: boolean
}
export const InputRange: React.FC<InputRangePropsType> = ({
                                                              name,
                                                              label,
                                                              rules,
                                                              control,
                                                              rows = 2,
                                                              disabled = false
                                                          }) => {
    return <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field, fieldState}) => <Item label={label} required={!!rules?.required} error={fieldState.error}
                                               disabled={disabled}>
            <div className={classes.inputRange}>
                <Slider value={field.value} onChange={field.onChange}/>
            </div>
        </Item>}
    />
}