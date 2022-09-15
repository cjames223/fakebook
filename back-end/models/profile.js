import mongoose from 'mongoose'
import Schema from 'mongoose'

const profileSchema = mongoose.Schema({
    _id: { type: String },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String },
    coverImage: { type: String },
    birthday: { type: Date },
    friends: { type: Schema.Types.ObjectId, ref: 'User' },
})

export default mongoose.model('Profile', profileSchema)