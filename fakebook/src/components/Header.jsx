import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import React, { useRef, useState } from 'react'
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
import { useEffect } from 'react';

const Header = () => {
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // const [profile, setProfile] = useState()

    const currentLocation = window.location.pathname.split('/')
    const currentProfile = currentLocation[2]

    let allPostContainer = useSelector((state) => state.ref_all_post_container)
    let createPostContainer = useSelector((state) => state.ref_create_post_container)
    let photoContainerCard = useSelector((state) => state.ref_photo_container_card)
    let profiles = useSelector((state) => state.profiles)

    let userProfile

    profiles.map((profile) => {
        if(profile._id === currentProfile) {
            userProfile = profile
        }
    })

    console.log(currentLocation)
    
   console.log(profiles)

    const userName = userProfile?.name ?? ''
    const profileImage = userProfile?.profileImage
    const coverImage = userProfile?.coverImage
    const avatar_placeholder = `${userProfile?.given_name.charAt(0).toUpperCase() ?? ''}${userProfile?.family_name.charAt(0).toUpperCase() ?? ''}`

    const items = [
        {label: 'Posts', icon: 'pi pi-fw pi-book', command: () => {
            createPostContainer.style.display = 'flex'
            allPostContainer.style.display = 'block'
            photoContainerCard.style.display = 'none'
        }},
        {label: 'About', icon: 'pi pi-fw pi-id-card'},
        {label: 'Friends', icon: 'pi pi-fw pi-users'},
        {label: 'Photos', icon: 'pi pi-fw pi-images', command: () => {
            photoContainerCard.style.display = 'block'
            createPostContainer.style.display = 'none'
            allPostContainer.style.display = 'none'
        }},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];



  return (
    <div>
      <div className='header-container'>
        <Card className='header-card'>
            <div>
                <Image imageClassName='cover-image' src={coverImage} width="1200" downloadable />
            </div>
            <div className='header-avatar'>
                <div className='avatar-image-container' value='text'>
                    <Avatar className='avatar-image' image={profileImage} shape='circle' label={avatar_placeholder}/>
                </div>
                <div>
                    <span className='header-profile-name profile-name'>{userName}</span>
                </div>
            </div>
            <hr />
            <TabMenu className='profile-tab-menu' model={items} />
        </Card>
      </div>
    </div>
  )
}

export default Header
