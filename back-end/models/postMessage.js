import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    given_name: String,
    family_name: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post