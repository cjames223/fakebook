import express from 'express'

import { getUsers, signin, signup, updateUser } from '../controllers/users.js'

import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/', getUsers)
router.post('/signin', signin)
router.post('/signup', signup)
router.patch('/:id', auth, updateUser)

export default router