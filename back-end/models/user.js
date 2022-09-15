import mongoose from 'mongoose'
import Schema from 'mongoose'

const userSchema = mongoose.Schema({
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    coverImage: { type: String },
    birthday: { type: Date },
})

export default mongoose.model('User', userSchema)