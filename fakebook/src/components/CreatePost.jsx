import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'
import React, { useRef } from 'react'

function CreatePost () {

    const regRef = useRef()

    const CreatePost = () => {
        regRef.current.style.opacity = 1;
        regRef.current.style.pointerEvents = 'auto';
    }

    const closeCreatePost = () => {
        regRef.current.style.opacity = 0;
        regRef.current.style.pointerEvents = 'none';
    }

    return (
        <div>
            <div className='create-post-container'>
                <Card className='create-post-card'>
                    <div className='create-post'>
                        <Avatar image={img} shape='circle' size='large' />
                        <button className='write-post-button' onClick={CreatePost}><span className='write-post-text'>What's on your Mind?</span></button>
                    </div>
                </Card>
            </div>
            
            <div ref={regRef} className='create-post-modal-container'>
            <div className='create-post-modal'>
                <div className='create-post-close-button'>
                    <div className='create-post-text-container'>
                        <h2 className='create-post-text'>Create Post</h2>
                    </div>
                    <div className='close-button-container'>
                        <Button icon='pi pi-times' className='close p-button-rounded p-button-danger' aria-label='Cancel' onClick={closeCreatePost}/>   
                    </div>
                </div>
                <hr className='create-post-break' />
                <div>
                    <InputTextarea className='post-text-area' rows={5} cols={30} placeholder="What's on your mind?" />
                </div>
                <div className='add-to-post-container'>
                    <div className='add-to-post'>
                        <h3 className='add-to-post-text'>Add to your post</h3>
                        <div className='add-to-post-buttons'>
                            <Button icon='pi pi-images' className='p-button-rounded p-button-success p-button-text p-button-lg' />
                            <Button icon='pi pi-images' className='p-button-rounded p-button-success p-button-text p-button-lg' />
                            <Button icon='pi pi-images' className='p-button-rounded p-button-success p-button-text p-button-lg' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    )
}

export default CreatePost