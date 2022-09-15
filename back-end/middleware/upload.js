import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')  
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage}).single('photo')

const uploadFile = async (req, res, next ) => {
    console.log(req)
    upload(req, res, (err) => {
        try {
            if (err instanceof multer.MulterError) {
                console.log (err)
            } else if (err) {
                console.log(err)
            }
            
        } catch (error) {
            console.log(error)
        }
        
        next()
    })
}

export default uploadFile