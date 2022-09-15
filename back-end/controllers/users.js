import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import Profile from '../models/profile.js'

export const getUsers = async (req, res) => {
    try {
        const Users = await User.find()

        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials'})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirm_password, given_name, family_name, date } = req.body
console.log(req.body)
    try {
        const existingUser = await User.findOne({ email })
console.log(existingUser)
        if(existingUser) return res.status(400).json({ message: "User already exists."})

        if(password !== confirm_password) return res.status(400).json({ message: "Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12)
console.log(hashedPassword)
        const result = await User.create({ email, password: hashedPassword, given_name: given_name, family_name: family_name, name: `${given_name} ${family_name}` })
console.log(result)
        await Profile.create({ _id: result._id, email, given_name: given_name, family_name: family_name, name: `${given_name} ${family_name}`, birthday: date })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '365 days' })

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}