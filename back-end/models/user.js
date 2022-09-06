import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    id: { type: String },
    photoURL: { type: String },
    birthday: { type: Date }
})

export default mongoose.model('User', userSchema)