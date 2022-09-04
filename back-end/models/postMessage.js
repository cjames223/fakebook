import mongoose from 'mongoose'

const date = new Date().toLocaleDateString('en', {
    month: 'long', 
    day: 'numeric'
})

const time = new Date().toLocaleTimeString('en', {
    hour: 'numeric', 
    minute: '2-digit'
})

let calcTime = `${date} at ${time}`

console.log(calcTime)

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    creator: String,
    tags: [String],
    selectedFile: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString('en', {
            month: 'long',
            day: 'numeric'
        })
    },
    time: {
        type: String,
        default: new Date().toLocaleTimeString('en', {
            hour: 'numeric',
            minute: '2-digit'
        })
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post