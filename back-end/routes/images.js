import express from 'express'

import { uploadPhoto, getPhotos } from '../controllers/images.js'
import auth from '../middleware/auth.js'
import uploadFile from '../middleware/upload.js'

const router = express.Router()

router.get('/', getPhotos)
router.post('/', uploadFile, uploadPhoto)

export default router