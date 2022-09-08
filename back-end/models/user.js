import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    profileImage: { type: String },
    images: { type: [String] },
    birthday: { type: Date },
    friends: { type: [String] }
})

export default mongoose.model('User', userSchema)