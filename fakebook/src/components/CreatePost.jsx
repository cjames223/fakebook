import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import React, { useRef, useState, useEffect } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'
import { FileUpload } from 'primereact/fileupload'
import { Tooltip } from 'primereact/tooltip'
import { useDispatch } from 'react-redux'
import { createPost } from '../actions/posts'
import { getCreatePostContainer } from '../actions/create_post_container';
import { Toast } from 'primereact/toast'

function CreatePost () {
    const dispatch = useDispatch()

    const [postData, setPostData] = useState({
        body: '',
        given_name: '',
        family_name: '',
        name: '',
        selectedFile: ([]),
    })

    let user = JSON.parse(localStorage.getItem('profile'))
   
    const regRef = useRef()
    const regRefImg = useRef()
    const regRefText = useRef()
    const regRefEmptyPost = useRef()
    const fileUploadRef = useRef(null);
    const createPostContainer = useRef()

    const givenName = user?.result.given_name
    const familyName = user?.result.family_name
    const fullName = user?.result.name
    const picture = user?.result.picture
    const avatar_placeholder = `${user?.result.given_name.charAt(0).toUpperCase()}${user?.result.family_name.charAt(0).toUpperCase()}`

    const showEmptyPost = () => {
        regRefEmptyPost.current.show({severity: 'error', summary: 'Error Message', detail: "Cannot submit empty post!", life: 3000})
    }

    const handleSubmit = async () => {
        if (regRefText.current.value !== '' || postData.selectedFile.length !== 0) {
            regRef.current.style.opacity = 0;
            regRef.current.style.pointerEvents = 'none';
            regRefImg.current.style.display = 'none'
            dispatch(createPost(postData))
            regRefText.current.value = ''
            setPostData({ body: '', given_name: '', family_name: '', name: '', selectedFile: ([])})
            fileUploadRef.current.clear()
            regRefEmptyPost.current.show({severity: 'success', summary: 'Created', detail: "Post Created!", life: 3000})
        } else {
            showEmptyPost()
            }
        }

    const CreatePost = () => {
        regRef.current.style.opacity = 1;
        regRef.current.style.pointerEvents = 'auto';
        setPostData ({ ...postData, name: fullName, given_name: givenName, family_name: familyName})
    }

    const closeCreatePost = () => {
        regRef.current.style.opacity = 0;
        regRef.current.style.pointerEvents = 'none';
        regRefImg.current.style.display = 'none'
        regRefText.current.value = ''
        fileUploadRef.current.clear()
        setPostData({ body: '', given_name: '', family_name: '', name: '', selectedFile: ([])})
    }

    const uploadPhoto = () => {
        regRefImg.current.style.display = 'block'
    }

    const uploadImg =  (e) => {
        let images = []
        const reader = new FileReader()
        e.files.forEach(async file => {
            let blob = await fetch(file.objectURL).then(r => r.blob())
            reader.readAsDataURL(blob)
            reader.onloadend = function () {
                const base64data = reader.result
                images.push(base64data)
            }
        })

        setPostData({ ...postData, selectedFile: images})
        console.log(postData)
    }  

    const onTemplateRemove = (callback) => {
        setPostData({ ...postData, selectedFile: ([])})
        callback();
    } 

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {cancelButton}
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    useEffect(() => {
        dispatch(getCreatePostContainer(createPostContainer))
    })

    return (
        <div className='create-post-all-container'>
            <Toast ref={regRefEmptyPost} />

            <div ref={createPostContainer} className='create-post-container'>
                <Card className='create-post-card'>
                    <div className='create-post'>
                        <Avatar image={picture} label={avatar_placeholder} shape='circle' size='large' />
                        <button className='write-post-button' onClick={CreatePost}><span className='write-post-text'>What's on your mind?</span></button>
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
                    <div className='create-avatar-container'>
                        <div>
                            <Avatar image={picture} label={avatar_placeholder} shape='circle' size='xlarge' />
                        </div>
                        <div>
                            <span className='profile-name'>{fullName}</span>
                        </div>
                    </div>
                    <div>
                        <InputTextarea ref={regRefText} className='post-text-area' rows={5} cols={30} placeholder="What's on your mind?" onChange={(e) => setPostData({ ...postData, body: e.target.value})}/>
                    </div>
                    <div ref={regRefImg}className='photo-upload-container'>
                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                        <div className="photo-upload">
                            <FileUpload ref={fileUploadRef} customUpload={true} uploadHandler={uploadImg} accept="image/*" maxFileSize={10000000}
                                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions} cancelOptions={cancelOptions} auto />
                        </div>
                    </div>
                    <div className='add-to-post-container'>
                        <div className='post-button-container'>
                            <Button label='Post' className='p-button-raised post-button' onClick={handleSubmit}/>
                        </div>
                        <div>
                            <Button icon='pi pi-images' className='p-button-success  img-button' onClick={uploadPhoto}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost