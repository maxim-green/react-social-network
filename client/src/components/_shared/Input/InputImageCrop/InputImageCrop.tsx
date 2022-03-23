import React, {useState} from 'react'
import {Controller, RegisterOptions} from 'react-hook-form'
import {Area, Point} from 'react-easy-crop/types'
import {Control} from 'react-hook-form/dist/types/form'
import classes from './InputImageCrop.module.scss'
import Cropper from 'react-easy-crop'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import {Item} from 'components/_shared/Form/Form'

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