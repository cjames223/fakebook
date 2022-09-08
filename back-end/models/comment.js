import mongoose, { Schema } from 'mongoose'

const commentSchema = mongoose.Schema({
    body: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now}
})