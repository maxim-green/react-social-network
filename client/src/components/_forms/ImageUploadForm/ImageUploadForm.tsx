<<<<<<< HEAD
import React, {useEffect, useState} from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import Cropper from 'react-easy-crop'
import {Area, Point} from 'react-easy-crop/types'
import Slider from 'rc-slider'
import classes from './ImageUploadForm.module.scss'
import Form from 'components/_shared/Form/Form'
import {InputFile} from 'components/_shared/Input/InputFile'
=======
import React, {useState} from 'react'
import {Area} from 'react-easy-crop/types'
>>>>>>> 52a7b24a91f5893b374a8a155e48a7bfe397d94c
import {Button} from 'components/_shared/Button/Button'
import {Form, FormRow} from 'components/_shared/Form/Form'
import {InputFile} from 'components/_shared/Input/InputFile/InputFile'
import {InputImageCrop} from 'components/_shared/Input/InputImageCrop/InputImageCrop'


type PropsType = {
    aspect: number
    onSubmit: (image: File, cropArea: Area) => void
    closeModal?: () => void
}

const ImageUploadForm: React.FC<PropsType> = ({aspect, onSubmit, closeModal}) => {
    const [srcFileUrl, setSrcFileUrl] = useState<string | null>(null)

    const fileChangeHandler = (file: File) => {
        setSrcFileUrl(window.URL.createObjectURL(file))
    }

    const submit = (data: { file: File, crop: Area }) => {
        onSubmit(data.file, data.crop)
    }

    return (
        <div>
<<<<<<< HEAD
            {/*todo: fix this ugly any*/}
            <Form onSubmit={handleSubmit(submit as any)}>
                <Form.Row>
=======
            <Form onSubmit={submit}>
                <FormRow>
>>>>>>> 52a7b24a91f5893b374a8a155e48a7bfe397d94c
                    {srcFileUrl && <Button size="large">
                        <Button.Text>
                            Save
                        </Button.Text>
                    </Button>}

                    {srcFileUrl && <Button type='secondary' size="large" onClick={(e) => {
                        e.preventDefault()
                        setSrcFileUrl(null)}}
                    >
                        <Button.Text>Choose other image</Button.Text>
                    </Button>}

                    <div style={{marginLeft: 'auto'}}>
                        {closeModal && <Button type={'cancel'} size='large' onClick={closeModal}>
                            <Button.Text>Close</Button.Text>
                        </Button>}
                    </div>
                </FormRow>

                {!srcFileUrl && <FormRow>
                    <InputFile
                        name={'file'}
                        label={'Drop your files in the area below'}
                        rules={{required: true}}
                        onChange={fileChangeHandler}
                    />
                </FormRow>}

                {srcFileUrl && <FormRow>
                    <InputImageCrop
                        name={'crop'}
                        aspect={aspect}
                        srcFileUrl={srcFileUrl}
                    />
                </FormRow>}

            </Form>
        </div>
    )
}

export default ImageUploadForm