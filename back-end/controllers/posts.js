import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'
import Image from '../models/image.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = JSON.parse(req.body.data)

    const newPost = new PostMessage({ ...post, selectedFile: req.file?.path ?? undefined, creator: req.userId, createdAt: new Date().toISOString()})
    
    if(req.file) {
        const image = {
            path: req.file?.path,
            originalName: req.file?.originalname
        }
    
        const postImage = new Image({ ...image, uploadedBy: req.userId, uploadedAt: new Date().toISOString()})

        await postImage.save()
    }
    

    try {
        await newPost.save()
        
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = JSON.parse(req.body.data)

    const postUpdate = {...post, selectedFile: req.file.path}

    

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Post not found')

    if (req.file) {
        const image = {
            path: req.file.path,
            originalName: req.file.originalname
        }

        const postImage = new Image({ ...image, uploadedBy: req.userId, uploadedAt: new Date().toISOString()})
    
        await postImage.save()
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, postUpdate, { new: true })

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Post not found')

    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'Post deleted'})
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if(!req.userId) return res.json({ message: 'Unauthenticated' })

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Post not found')

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if(index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true})

    res.json(updatedPost)

}