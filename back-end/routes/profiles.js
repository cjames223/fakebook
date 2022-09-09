import express from 'express'

import { getProfile, getProfiles, uploadPhoto } from '../controllers/profiles.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getProfiles)
router.post('/:id', getProfile)
router.patch('/:id', auth, uploadPhoto)

export default router