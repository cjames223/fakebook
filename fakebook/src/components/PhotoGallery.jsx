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
import { getPhotos } from '../actions/images';
import { uploadPhoto } from '../actions/images'
import { Menu } from 'primereact/menu'

const PhotoGallery = ({images}) => {
    const dispatch = useDispatch()
console.log('refresh')
    const [refresh, setRefresh] = useState({
        refresh: false
    })

    const currentLocation = window.location.pathname.split('/')
    const currentProfile = currentLocation[2]

    let user = JSON.parse(localStorage.getItem('profile'))

    const photoUploadToast = useRef()
    const photoContainerCard = useRef()
    const fileUploadRef = useRef()
    const menu = useRef()
    
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

    let items = [
        {label: 'Make Profile Photo', icon: 'pi pi-fw pi-id-card'},
        {label: 'Make Cover Photo', icon: 'pi pi-fw pi-image'},
        {label: 'Delete', icon: 'pi pi-fw pi-trash'}
    ]

    useEffect(() => {
        dispatch(getPhotoContainerCard(photoContainerCard))
        setRefresh({ refresh: false })
    }, [])

    return (
        <div>
            <Toast ref={photoUploadToast}></Toast>
            <Card ref= {photoContainerCard} className='photo-container-card'>
                <div className='photo-header'>
                    <div>
                        <h1>Photos</h1>
                    </div>
                    <div>
                        <FileUpload ref={fileUploadRef} chooseLabel='Upload Photo' mode="basic" url='/image' name="photo" accept="image/*" auto maxFileSize={10000000} onBeforeSend={getUserId} onProgress={uploadImg} onUpload={galleryRefresh} />
                    </div>
                </div>
                <div className='photo-container' >
                    {images.map((image) => {
                        if (image.uploadedBy === currentProfile) {
                            return (
                                <div style={{postion: 'relative'}}>
                                    <Menu model={items} popup ref={menu} />
                                    <Button icon="pi pi-pencil" className="p-button-secondary p-button-lg p-button-rounded p-button-text img-options-button" onClick={(event) => menu.current.toggle(event)} />
                                    {/* <Button style={{position: 'absolute', zIndex: '1'}} /> */}
                                    <Image key={image.uploadedAt} imageClassName='photos' src={`http://localhost:5000/${image.path}`} onClick={() => image.mozRequestFullscreen()} style={{cursor: 'pointer'}} downloadable preview />
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


