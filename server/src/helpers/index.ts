import {unlink} from 'fs/promises'
import path from 'path'
import {HTTPError} from 'helpers'

export * from './error.helpers'
export * from './jwt.helpers'


export const removeItem = <T = any>(array: Array<T>, value: T) => {
    const index = array.indexOf(value)
    if (index > -1) {
        array.splice(index, 1)
    }
}

const stripUrl = (url: string, baseUrl: string = `${process.env.URL}/`) => {
    return url.replace(baseUrl, '')
}

export const deleteFile = async (url: string) => {
    try {
        const filePath = path.join(__root, ...stripUrl(url).split('/'))
        await unlink(filePath)
    } catch(e) {
        console.log(e)
    }
}