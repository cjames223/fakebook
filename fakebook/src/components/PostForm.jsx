import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import React, { useRef } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

function PostForm () {

    const regRef = useRef()

    const closeCreatePost = () => {
        regRef.current.style.opacity = 0;
        regRef.current.style.pointerEvents = 'none';
    }

    return (
        <div ref={regRef} className='create-post-modal-container'>
            <div className='create-post-modal'>
                <div>
                    <Button icon='pi pi-times' className='close p-button-rounded p-button-danger' aria-label='Cancel' onClick={closeCreatePost}/>
                    <h2>Create Post</h2>
                </div>
                <hr className='create-post-break' />
                <div>
                    <InputTextarea className='post-text-area' rows={5} cols={30} placeholder="What's on your mind?" />
                </div>
                <div className='add-to-post'><h3 className='add-to-post-text'>Add to your post</h3></div>
            </div>
        </div>
    )
}

export default PostForm