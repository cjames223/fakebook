import mongoose from 'mongoose'
import Schema from 'mongoose'

const profileSchema = mongoose.Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
})

export default mongoose.model('Profile', profileSchema)