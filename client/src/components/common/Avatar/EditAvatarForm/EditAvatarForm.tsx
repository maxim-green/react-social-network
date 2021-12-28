import React, {useCallback, useState} from 'react'
import Form from '../../Form/Form'
import FilePicker from '../../FilePicker/FilePicker'
import Button from '../../Button/Button'
import {resizeImage} from '../../../../utils/functions'
import Cropper from 'react-easy-crop'
import {Point} from 'react-easy-crop/types'
import classes from './EditAvatarForm.module.scss'

type PropsType = {
    onSubmit: (e: React.FormEvent, image: File, crop: Point) => void
}

const EditAvatarForm: React.FC<PropsType> = (props) => {
    const [srcFile, setSrcFile] = useState<File | null>(null)
    const [srcFileUrl, setSrcFileUrl] = useState<string | undefined>(undefined)
    const [zoom, setZoom] = useState<number>(1)
    const [crop, setCrop] = useState<Point>({
        x: 0,
        y: 0
    } as Point)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({x: 0, y: 0, width: 100, height: 100})

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const setPickedFile = async (file: File) => {
        setSrcFile(file)
        setSrcFileUrl(window.URL.createObjectURL(file))
        const resizedImage = await resizeImage(file)
        console.log(resizedImage)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (srcFile && crop) props.onSubmit(e, srcFile, croppedAreaPixels)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <FilePicker label="Pick file" setPickedFile={setPickedFile}/>
                </Form.Row>
                <Form.Row>
                        <div className={classes.cropperContainer}>
                            {srcFileUrl && <Cropper
                                image={srcFileUrl}
                                crop={crop}
                                cropShape={'round'}
                                zoom={zoom}
                                showGrid={false}
                                aspect={1 / 1}
                                onCropComplete={onCropComplete}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                            />}
                        </div>
                </Form.Row>
                <Form.Row>
                    <Button caption="Save" size="lg"/>
                </Form.Row>
            </Form>
        </div>
    )
}

export default EditAvatarForm