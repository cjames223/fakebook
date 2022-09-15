import Image from '../models/image.js'

export const uploadPhoto = async (req, res) => {
    const image = {
        path: req.file.path,
        originalName: req.file.originalname
    }

    const uploadedImage = new Image({ ...image, uploadedBy: req.body.ID, uploadedAt: new Date().toISOString()})

    try {
        await uploadedImage.save()

        res.status(201).json(uploadedImage)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getPhotos = async (req, res) => {
    try {
        const photos = await Image.find()

        res.status(200).json(photos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}