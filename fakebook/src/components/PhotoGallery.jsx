import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import React, { useRef, useEffect, useState, useCallback } from 'react'
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
import { uploadPhoto } from '../actions/images'
import { applyMiddleware } from 'redux';

const PhotoGallery = () => {
    const dispatch = useDispatch()

    const [refresh, setRefresh] = useState({
        refresh: false
    })

    const currentLocation = window.location.pathname.split('/')
    const currentProfile = currentLocation[2]

    let user = JSON.parse(localStorage.getItem('profile'))

    let images = useSelector((state) => state.images)

    const photoUploadToast = useRef()
    const photoContainerCard = useRef()
    const fileUploadRef = useRef()
    
    const userId = user.result._id

    const getUserId = (e) => {
        e.formData.append('ID', userId)
        console.log(e)
        console.log(e.formData.get('photo'))
    }    

    const uploadImg = async (e)  =>  {
        photoUploadToast.current.show({severity: 'info', summary: 'Success', detail: 'Photo Uploaded!'})
    }

    const galleryRefresh = (e) => {
        setTimeout(() => {
            setRefresh((prev) => ({ ...prev, refresh: true }))
        }, 5000);
    }

    console.log(photoUploadToast)

    useEffect(() => {
        dispatch(getPhotoContainerCard(photoContainerCard))
        setRefresh({ refresh: false })
    }, [])

    let date = Date.now()

    return (
        <div>
            <Toast ref={photoUploadToast}></Toast>
            <Card ref= {photoContainerCard} className='photo-container-card'>
                <div className='photo-header'>
                    <div>
                        <h1>Photos</h1>
                    </div>
                    <div>
                        <FileUpload ref={fileUploadRef} mode="basic" url='/image' name="photo" accept="image/*" auto maxFileSize={10000000} onBeforeSend={getUserId} onProgress={uploadImg} onUpload={galleryRefresh} />
                    </div>
                </div>
                <div className='photo-container' >
                    {images.map((image) => {
                        if (image.uploadedBy === currentProfile) {
                            return (
                                <div>
                                    <Image imageClassName='photos' src={`http://localhost:5000/${image.path}`} onClick={() => console.log('it works')} style={{cursor: 'pointer'}} downloadable />
                                </div>  
                            )
                        }
                    })}
                </div>
            </Card>
        </div>
    )
}

export default PhotoGallery


