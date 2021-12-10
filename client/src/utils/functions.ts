import axios, {AxiosResponse} from 'axios'

export const capitalize = (sourceString: string): string => {
    return sourceString.charAt(0).toUpperCase() + sourceString.slice(1)
}

export const getFileFromObjectURL = async (objectURL: string) => {
    return axios({
        method: 'get',
        url: objectURL,
        responseType: 'blob'
    }).then((response: AxiosResponse<Blob>) => {
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = () => {
            const base64data = reader.result;
            console.log(base64data)
        }
    })
}

export const resizeImage = async (file: File) => {
    let resizedImageURL
    const reader = new FileReader()
    // debugger
    const createImage = (e: ProgressEvent<FileReader>) => {
        console.log('from createImage')
        const img = document.createElement('img')
        img.onload = (e) => {
            console.log('fromLoadImage')
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0, 300, 300)
            resizedImageURL = canvas.toDataURL()
        }
        img.src = (reader.result) ? reader.result.toString() : ''
    }
    console.log(resizedImageURL)
    reader.onload = createImage
    return await reader.readAsDataURL(file)
}