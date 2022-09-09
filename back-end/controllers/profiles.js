import mongoose from 'mongoose'
import ObjectId from 'mongoose'
import Profile from '../models/profile.js'
import User from '../models/user.js'

export const getProfiles = async (req, res) => {
    try {
        const Profiles = await Profile.find()

        res.status(200).json(Profiles)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



export const uploadPhoto = async (req, res) => {
    const { id } = req.params

    const photo = req.body
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(403).send('User not found')

    const user = await User.findById(id)
    const profile = await Profile.find({ userId: id })

    const userId = user._id.toHexString()

    if(userId === profile[0].userId) {
        profile[0].images.push(photo[0])    
    } else {
        return res.status(403).send('User is not allowed to make this request')
    }
    
    const filter = { userId: id }
    
    const uploadedPhoto = await Profile.findOneAndUpdate(filter, profile[0], { new: true })

    res.json(uploadedPhoto)
}