import React, {useState} from 'react'
import {Area} from 'react-easy-crop/types'
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

            <Form onSubmit={submit}>
                <FormRow>
                    {srcFileUrl && <Button size="lg">
                        <Button.Text>
                            Save
                        </Button.Text>
                    </Button>}

                    {srcFileUrl && <Button type='secondary' size="lg" onClick={(e) => {
                        e.preventDefault()
                        setSrcFileUrl(null)}}
                    >
                        <Button.Text>Choose other image</Button.Text>
                    </Button>}

                    <div style={{marginLeft: 'auto'}}>
                        {closeModal && <Button type={'cancel'} size='lg' onClick={closeModal}>
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