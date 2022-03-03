import React, {useState} from 'react'
import {Area} from 'react-easy-crop/types'
import {Button} from 'components/_shared/Button/Button'
import {CForm, CFormRow, InputFile, InputImageCrop} from 'components/_shared/CForm/CForm'


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
            <CForm onSubmit={submit}>
                <CFormRow>
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
                </CFormRow>

                {!srcFileUrl && <CFormRow>
                    <InputFile
                        name={'file'}
                        label={'Drop your files in the area below'}
                        rules={{required: true}}
                        onChange={fileChangeHandler}
                    />
                </CFormRow>}

                {srcFileUrl && <InputImageCrop
                    name={'crop'}
                    aspect={aspect}
                    srcFileUrl={srcFileUrl}
                />}

            </CForm>
        </div>
    )
}

export default ImageUploadForm