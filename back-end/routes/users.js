import express from 'express'

import { getUser, getUsers, signin, signup } from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/:id', getUser)
router.post('/signin', signin)
router.post('/signup', signup)

export default router