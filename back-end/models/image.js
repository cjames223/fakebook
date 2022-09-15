import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    path: { type: String, required: true },
    originalName: { type: String, required: true },
    uploadedBy: { type: String },
    uploadedAt: { type: String }
})

export default mongoose.model('Image', imageSchema)