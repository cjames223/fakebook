import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import React, { useRef, useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'
import { FileUpload } from 'primereact/fileupload'
import { Tooltip } from 'primereact/tooltip'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../actions/posts'
import { Toast } from 'primereact/toast'
import { Image } from 'primereact/image'
import { TabMenu } from 'primereact/tabmenu'
import { Galleria } from 'primereact/galleria'
import { getPhotoContainerCard } from '../actions/photo_container_card'
import { uploadPhoto } from '../actions/profiles'
import { ConnectedOverlayScrollHandler } from 'primereact/utils';

const PhotoGallery = () => {
    const dispatch = useDispatch()

    let user = JSON.parse(localStorage.getItem('profile'))

    let users = useSelector((state) => state.users)
    let profiles = useSelector((state) => state.profiles)
console.log(users)
console.log(profiles)
    const [imgData, setImgData] = useState([])

    const [galleryImages, setGalleryImages] = useState([])

    const [currentId, setCurrentId] = useState([])

    const photoUploadToast = useRef()
    const photoContainerCard = useRef()
    const fileUploadRef = useRef()

    const uploadImg = async (e)  =>  {
        let base64images = []
        const reader = new FileReader()

        let blob = await fetch(e.files[0].objectURL).then(r => r.blob())
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            const base64data = reader.result
            base64images.push(base64data)
            setImgData(base64images)
            console.log(imgData)
        }
        dispatch(uploadPhoto(currentId, imgData))
        photoUploadToast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'})
        fileUploadRef.current.clear()
    }

    useEffect(() => {
        for (let i of users) {
            for (let j of profiles) {
                if (i._id === j.userId) {
                    console.log(j)
                    return setGalleryImages(j.images)
                }
            } 
        }
    })

    useEffect(() => {
        dispatch(getPhotoContainerCard(photoContainerCard))
        setCurrentId(user.result._id)
    }, [dispatch])

    return (
        <div>
            <Toast ref={photoUploadToast}></Toast>
            <Card ref= {photoContainerCard} className='photo-container-card'>
                <div className='photo-header'>
                    <div>
                        <h1>Photos</h1>
                    </div>
                    <div>
                        <FileUpload ref={fileUploadRef} mode="basic" name="photo-upload" customUpload  accept="image/*" auto maxFileSize={10000000} uploadHandler={uploadImg} />
                    </div>
                </div>
                <div className='photo-container' >
                    {galleryImages.map((image) => {
                        return (
                            <div>
                                <Image imageClassName='photos' src={image} downloadable />
                            </div>   
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}

export default PhotoGallery


