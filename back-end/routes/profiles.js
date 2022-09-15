import express from 'express'

import { getProfiles, getProfile } from '../controllers/profiles.js'

const router = express.Router()

router.get('/', getProfiles)
router.get('/:id', getProfile)

export default router