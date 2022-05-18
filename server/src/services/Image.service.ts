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
        small: `${process.env.URL}${smUploadPath}`,
        large: `${process.env.URL}${lgUploadPath}`
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

    return `${process.env.URL}${uploadPath}`
}

export const savePostImage = async (
    file: Express.Multer.File, postId: string, imageId: string | number
) => {
    const extension = path.extname(file.originalname)

    const uploadPathOriginal = `/uploads/post/post${postId}-image${imageId}${extension}`
    const uploadPathThumbnail = `/uploads/post/post${postId}-image${imageId}_thumbnail${extension}`

    await sharp(file.buffer)
        .toFile(path.join(__root, uploadPathOriginal))

    await sharp(file.buffer)
        .resize({fit: sharp.fit.cover, width: 720, height: 720})
        .toFile(path.join(__root, uploadPathThumbnail))

    return {
        original: `${process.env.URL}${uploadPathOriginal}`,
        thumbnail: `${process.env.URL}${uploadPathThumbnail}`
    }
}