import mongoose from 'mongoose'
import Profile from '../models/profile.js'

export const getProfiles = async (req, res) => {
    try {
        const Profiles = await Profile.find()

        res.status(200).json(Profiles)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProfile = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Profile not found')

    const profile = await Profile.findById(_id)

    res.json(profile)
}