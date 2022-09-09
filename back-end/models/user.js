import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    id: { type: String },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export default mongoose.model('User', userSchema)