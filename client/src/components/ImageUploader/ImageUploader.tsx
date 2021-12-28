import Form from '../common/Form/Form'
import FilePicker from '../common/FilePicker/FilePicker'
import Button from '../common/Button/Button'
import React, {useCallback, useState} from 'react'
import {Point} from 'react-easy-crop/types'
import {resizeImage} from '../../utils/functions'
import {Slider} from 'antd'
import classes from './ImageUploader.module.scss'
import Cropper from 'react-easy-crop'

const ImageUploader: React.FC = () => {
    const [srcFile, setSrcFile] = useState<File | null>(null)
    const [srcFileUrl, setSrcFileUrl] = useState<string | undefined>(undefined)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({x: 0, y: 0, width: 100, height: 100})

    const setPickedFile = async (file: File) => {
        setSrcFile(file)
        setSrcFileUrl(window.URL.createObjectURL(file))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(srcFile, croppedAreaPixels)
    }



    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <FilePicker label="Pick file" setPickedFile={setPickedFile}/>
                </Form.Row>
                {srcFileUrl && <Form.Row>
                    <ImageCrop
                        srcFileUrl={srcFileUrl}
                        setCroppedAreaPixels={setCroppedAreaPixels}
                    />
                </Form.Row>}
                <Form.Row>
                    <Button caption="Save" size="lg"/>
                </Form.Row>
            </Form>
        </div>
    )
}

type ImageCropPropsType = {
    srcFileUrl?: string
    setCroppedAreaPixels: any
}
const ImageCrop: React.FC<ImageCropPropsType> = ({srcFileUrl, setCroppedAreaPixels}) => {
    const [zoom, setZoom] = useState<number>(1)
    const [crop, setCrop] = useState<Point>({
        x: 0,
        y: 0
    } as Point)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const sliderChangeHandler = (value: number) => {
        setZoom(value)
    }
    return(
        <div className={classes.imageCrop}>
                <div className={classes.cropperContainer}>
                    {srcFileUrl && <Cropper
                        image={srcFileUrl}
                        crop={crop}
                        zoom={zoom}
                        showGrid={false}
                        aspect={7 / 2}
                        onCropComplete={onCropComplete}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                    />}
                </div>
                <div style={{width: '100%'}}>
                    <Slider
                        min={1}
                        max={10}
                        step={0.01}
                        value={zoom}
                        onChange={sliderChangeHandler}
                    />
                </div>
        </div>
    )
}

export default ImageUploader