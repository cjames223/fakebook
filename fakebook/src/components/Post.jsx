import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import moment from 'moment'
import img from '../img/profile_img.jpg'

import { useRef, useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Menu } from 'primereact/menu'
import { Toast } from 'primereact/toast'
import { useDispatch, useSelector } from 'react-redux'
import { InputTextarea } from 'primereact/inputtextarea'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { updatePost, deletePost, likePost } from '../actions/posts'

function Post ({ post }) {
    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)

    const [postData, setPostData] = useState({
        body: '',
        given_name: '',
        family_name: '',
        name: '',
        selectedFile: ([]),
    })

    const [currentId, setCurrentId] = useState()

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [postAvatar, setPostAvatar] = useState()

    const [postAvatarLabel, setPostAvatarLabel] = useState()

    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const menu = useRef()
    const updateDeleteToast = useRef()
    const regRef = useRef()
    const regRefImg = useRef()
    const regRefText = useRef()
    const regRefEmptyPost = useRef()
    const fileUploadRef = useRef(null);
    const commentInputRef = useRef()

    const picture = loggedUser.result.picture
    const avatar_placeholder = `${loggedUser.result.given_name.charAt(0).toUpperCase()}${loggedUser.result.family_name.charAt(0).toUpperCase()}`

    let items = [
        {label: 'Update', icon: 'pi pi-fw pi-refresh', command: () => {
            UpdatePost()
        }},
        {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => {
            setDeleteDialog(true)
        }}
    ]

    const onHide = () => {
        setDeleteDialog(false);
    }

    const postDelete = () => {
        onHide()
        dispatch(deletePost(post._id))
        updateDeleteToast.current.show({severity: 'warn', summary: 'Deleted', detail: 'Post Deleted', life: 3000})
    }

    const deleteDialogFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={postDelete} autoFocus />
            </div>
        );
    }

    const showEmptyPost = () => {
        regRefEmptyPost.current.show({severity: 'error', summary: 'Error Message', detail: "Cannot submit empty post!", life: 3000})
    }

    const handleSubmit = async () => {
        if (regRefText.current.value !== '' || postData.selectedFile.length !== 0) {
            regRef.current.style.opacity = 0;
            regRef.current.style.pointerEvents = 'none';
            regRefImg.current.style.display = 'none'
            dispatch(updatePost(currentId, postData))
            regRefText.current.value = ''
            setPostData({ body: '', given_name: '', family_name: '', name: '', selectedFile: ([])})
            fileUploadRef.current.clear()
            updateDeleteToast.current.show({severity: 'success', summary: 'Updated', detail: 'Post Updated!', life: 3000})
        } else {
            showEmptyPost()
            }
        }

    const UpdatePost = () => {
        regRef.current.style.opacity = 1;
        regRef.current.style.pointerEvents = 'auto';
        setPostData ({ ...postData, name: post.name, given_name: post.given_name, family_name: post.family_name})
        setCurrentId (post._id)
    }

    const closeUpdatePost = () => {
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
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(props.onRemove)} />
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
        users.forEach(async user => {
            if(user?.sub === post?.creator || user?._id === post?.creator) {
                setPostAvatar(user.picture)
                setPostAvatarLabel(`${user.given_name.charAt(0).toUpperCase()}${user.family_name.charAt(0).toUpperCase()}`)
            }         
        })
    }, [])

    return (
        <div>
            <Toast ref={regRefEmptyPost} />

            <div className='post-container'>
                <Card className='post-template'>
                    <div className='post-inner-container'>
                        <div className='post-avatar-container'>
                            <div>
                                <Avatar image={postAvatar} label={postAvatarLabel} shape='circle' size='xlarge' />
                            </div>
                            <div>
                                <span className='profile-name'>{post.name}</span>
                                <h4 className='time'>{moment(post.createdAt).format('MMMM D [at] h:mm A')}</h4>
                            </div>
                            <div className='post-options-button-wrapper'>
                                <Toast ref={updateDeleteToast} />
                                <Menu model={items} popup ref={menu} />
                                {(loggedUser?.result?.sub === post?.creator || loggedUser?.result?._id === post?.creator) && (
                                    <Button icon="pi pi-list" className="p-button-secondary p-button-lg p-button-rounded p-button-text post-options-button" onClick={(event) => menu.current.toggle(event)} />
                                )}
                            </div>
                        </div>
                        <h2 className='post-body'>{post.body}</h2>
                        <img alt='post' className='post-image' src={post.selectedFile} />
                        <div className='like-comment-container'>
                            <i className='pi pi-thumbs-up like-icon'><span id={post.likes.length} className='like-count'>{post.likes.length}</span></i>
                            <h3>Comments</h3>
                        </div>
                        <div>
                            <hr className='post-break' />
                        </div>
                        <div className='like-comment-button-container'>
                            <Button label='Like' icon='pi pi-thumbs-up' className='p-button-secondary p-button-rounded p-button-text p-button-lg like-comment-button' onClick={() => dispatch(likePost(post._id))} />
                            <Button label='Comment' icon='pi pi-comment' className='p-button-secondary p-button-rounded p-button-text p-button-lg like-comment-button' onClick={() => commentInputRef.current.focus()}/>
                        </div>
                        <div>
                            <hr className='post-break' />
                        </div>
                        <div className='comment-container'>
                            <div>
                                <Avatar shape='circle' size='small' />
                            </div>
                            <div className='comment'>
                                <h3 className='comment-creator'>Carlton James Jr.</h3>
                                <p className='comment-text'>Straight Facts. </p>
                            </div>
                        </div>
                        <div className='write-comment-container'>
                            <div>
                                <Avatar image={picture} label={avatar_placeholder} shape='circle' size='large' />
                            </div>
                            <div>
                                <InputText ref={commentInputRef} className='comment-input' placeholder='Write a comment...' />
                            </div>   
                        </div>
                    </div>
                </Card>
            </div>

            <div className='all-post-container'>
                <div ref={regRef} className='create-post-modal-container'>
                    <div className='create-post-modal'>
                        <div className='create-post-close-button'>
                            <div className='create-post-text-container'>
                                <h2 className='create-post-text'>Update Post</h2>
                            </div>
                            <div className='close-button-container'>
                                <Button icon='pi pi-times' className='close p-button-rounded p-button-danger' aria-label='Cancel' onClick={closeUpdatePost}/>   
                            </div>
                        </div>
                        <hr className='create-post-break' />
                        <div className='create-avatar-container'>
                            <div>
                                <Avatar image={picture} label={avatar_placeholder} shape='circle' size='xlarge' />
                            </div>
                            <div>
                                <span className='profile-name'>{post.name}</span>
                            </div>
                        </div>
                        <div>
                            <InputTextarea ref={regRefText} className='post-text-area' rows={5} cols={30} placeholder="What's on your mind?" onChange={(e) => setPostData({ ...postData, body: e.target.value})}/>
                        </div>
                        <div ref={regRefImg} className='photo-upload-container'>
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

            <div className="delete-dialog-container">
                <div className="card">
                    <Dialog header='DANGER' visible={deleteDialog} style={{ width: '50vw' }} footer={deleteDialogFooter} onHide={onHide} >
                        <h1>Are you sure you want to delete this post?</h1>
                    </Dialog>
                </div>
            </div>
        </div>
    )
    
}

export default Post