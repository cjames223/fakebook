import express from 'express'

import { getUsers, signin, signup } from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/signin', signin)
router.post('/signup', signup)

export default router