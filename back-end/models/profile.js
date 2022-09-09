import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
    userId: { type: String, required: true },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String },
    coverImage: { type: String },
    birthday: { type: Date },
    images: { type: [String] },
    friends: { type: [String] },
})

export default mongoose.model('Profile', profileSchema)