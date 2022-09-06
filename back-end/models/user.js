import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    picture: { type: String },
    birthday: { type: Date }
})

export default mongoose.model('User', userSchema)