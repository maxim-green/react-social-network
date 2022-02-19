import sharp from 'sharp'
import path from 'path'

export const saveAvatarImage = async (file: Express.Multer.File, crop: {x: number, y: number, width: number, height: number}) => {
    const extension = path.extname(file.originalname)
    const timestamp = Date.now()

    const lgUploadPath = `/uploads/avatar/avatar${timestamp}-lg${extension}`
    await sharp(file.buffer)
        .toFile(path.join(__root, lgUploadPath))

    const smUploadPath = `/uploads/avatar/avatar${timestamp}-sm${extension}`
    await sharp(file.buffer)
        .extract({
            left: Math.round(crop.x),
            top: Math.round(crop.y),
            width: Math.round(crop.width),
            height: Math.round(crop.height)
        })
        .resize(120, 120)
        .toFile(path.join(__root, smUploadPath))

    return {
        small: `${process.env.URL}:${process.env.PORT}${smUploadPath}`,
        large: `${process.env.URL}:${process.env.PORT}${lgUploadPath}`
    }
}

export const saveCoverImage = async (file: Express.Multer.File, crop: {x: number, y: number, width: number, height: number}) => {
    const extension = path.extname(file.originalname)
    const timestamp = Date.now()

    const uploadPath = `/uploads/cover/cover${timestamp}${extension}`
    await sharp(file.buffer)
        .extract({
            left: Math.round(crop.x),
            top: Math.round(crop.y),
            width: Math.round(crop.width),
            height: Math.round(crop.height)
        })
        .resize({fit: sharp.fit.contain, width: 720})
        .toFile(path.join(__root, uploadPath))

    return `${process.env.URL}:${process.env.PORT}${uploadPath}`
}