import Form, {Button} from '../../_shared/Form/Form'
import React, {useEffect, useState} from 'react'
import {Area, Point} from 'react-easy-crop/types'
import Slider from "rc-slider";
import classes from './ImageUploadForm.module.scss'
import Cropper from 'react-easy-crop'
import {Controller, useForm} from "react-hook-form";
import {InputFile} from '../../_shared/Input/InputFile'


type PropsType = {
    aspect: number
    onSubmit: (image: File, cropArea: Area) => void
    closeModal?: () => void
}

const ImageUploadForm: React.FC<PropsType> = ({aspect, onSubmit, closeModal}) => {
    const {handleSubmit, control, watch, reset} = useForm()
    const [srcFileUrl, setSrcFileUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        const subscription = watch((data) => {
            data.file ? setSrcFileUrl(window.URL.createObjectURL(data.file)) : setSrcFileUrl(undefined)
        })
        return () => subscription.unsubscribe();
    }, [watch])

    const submit = (data: { file: File, crop: Area }) => {
        onSubmit(data.file, data.crop)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Row>
                    {srcFileUrl && <Button size="large">Save</Button>}
                    {srcFileUrl && <Button type='secondary' size="large" onClick={(e) => {
                        e.preventDefault();
                        reset()
                    }}>Choose other image</Button>}
                    <div style={{marginLeft: 'auto'}}>
                        {closeModal && <Button type={"cancel"} size='large' onClick={closeModal}>Close</Button>}
                    </div>
                </Form.Row>

                {!srcFileUrl && <Form.Row>
                    <Controller
                        control={control}
                        name={'file'}
                        rules={{required: true}}
                        render={({field, fieldState: {error}}) => <Form.Item name={field.name} component={InputFile}
                                                                             onChange={field.onChange}
                                                                             error={error && {
                                                                                 type: error.type,
                                                                                 message: 'This field is required'
                                                                             }}
                                                                             label={'Drop your files in the area below'}
                                                                             required/>}
                    />
                </Form.Row>}


                {srcFileUrl && <Form.Row><Controller
                    control={control}
                    name={'crop'}
                    render={({field}) => <ImageCrop aspect={aspect} srcFileUrl={srcFileUrl}
                                                    onChange={field.onChange}/>}
                /></Form.Row>}

            </Form>
        </div>
    )
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

export default ImageUploadForm