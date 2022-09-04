import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import { useRef, useState } from 'react'
import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Menu } from 'primereact/menu'
import { Toast } from 'primereact/toast'
import { useDispatch } from 'react-redux'
import { InputTextarea } from 'primereact/inputtextarea'
import { Tooltip } from 'primereact/tooltip'
import { FileUpload } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { createPost } from '../actions/posts'

function Post ({ post }) {
    const [postData, setPostData] = useState({
        body: '',
        creator: '',
        selectedFile: ([]),
    })

    const [deleteDialog, setDeleteDialog] = useState(false);

    const menu = useRef()
    const updateDeleteToast = useRef()
    const regRef = useRef()
    const regRefImg = useRef()
    const regRefCreator = useRef()
    const regRefText = useRef()
    const regRefEmptyPost = useRef()

    let items = [
        {label: 'Update', icon: 'pi pi-fw pi-refresh', command: () => {
            updateDeleteToast.current.show({severity: 'success', summary: 'Updated', detail: 'Post Updated!', life: 3000})
        }, command: () => {
            UpdatePost()
        }},
        {label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => {
            updateDeleteToast.current.show({severity: 'warn', summary: 'Deleted', detail: 'Post Deleted', life: 3000})
        }, command: () => {
            setDeleteDialog(true)
        }}
    ]

    const onHide = () => {
        setDeleteDialog(false);
    }

    const deleteDialogFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={onHide} autoFocus />
            </div>
        );
    }

    const dispatch = useDispatch()

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
            setPostData({ ...postData, selectedFile: ([])})
            fileUploadRef.current.clear()
        } else {
            showEmptyPost()
            }
        }

    const UpdatePost = () => {
        regRef.current.style.opacity = 1;
        regRef.current.style.pointerEvents = 'auto';
        setPostData ({ ...postData, creator: regRefCreator.current.innerText})
    }

    const closeUpdatePost = () => {
        regRef.current.style.opacity = 0;
        regRef.current.style.pointerEvents = 'none';
        regRefImg.current.style.display = 'none'
    }

    const uploadPhoto = () => {
        regRefImg.current.style.display = 'block'
    }

    const uploadImg = (e) => {
        let images = []
        e.files.forEach(file => {
            images.push(file.objectURL)
        })

        setPostData({ ...postData, selectedFile: images})
    }

    console.log(postData)

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        e.files.forEach(file => {
            _totalSize += file.size;
        });

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
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

    return (
        <div>
            <div className='post-container'>
                <Card className='post-template'>
                    <div className='post-inner-container'>
                        <div className='post-avatar-container'>
                            <div>
                                <Avatar image={img} shape='circle' size='xlarge' />
                            </div>
                            <div>
                                <span className='profile-name'>{post.creator}</span>
                                <h4 className='time'>{`${post.date} at ${post.time}`}</h4>
                            </div>
                            <div className='post-options-button-wrapper'>
                                <Toast ref={updateDeleteToast} />
                                <Menu model={items} popup ref={menu} />
                                <Button icon="pi pi-list" className="p-button-secondary p-button-lg p-button-rounded p-button-text post-options-button" onClick={(event) => menu.current.toggle(event)} />
                            </div>
                        </div>
                        <h2 className='post-body'>{post.body}</h2>
                        <img alt='post' className='post-image' src={post.selectedFile} />
                        <div className='like-comment-container'>
                            <i className='pi pi-thumbs-up like-icon'><span className='like-count'>{post.likeCount}</span></i>
                            <h3>Comments</h3>
                        </div>
                        <div>
                            <hr className='post-break' />
                        </div>
                        <div className='like-comment-button-container'>
                            <Button label='Like' icon='pi pi-thumbs-up' className='p-button-secondary p-button-rounded p-button-text p-button-lg' />
                            <Button label='Comment' icon='pi pi-comment' className='p-button-secondary p-button-rounded p-button-text p-button-lg' />
                        </div>
                        <div>
                            <hr className='post-break' />
                        </div>
                        <div className='comment-container'>
                            <div>
                                <Avatar image={img} shape='circle' size='small' />
                            </div>
                            <div className='comment'>
                                <h3 className='comment-creator'>Carlton James Jr.</h3>
                                <p className='comment-text'>Straight Facts. </p>
                            </div>
                        </div>
                        <div className='write-comment-container'>
                            <div>
                                <Avatar image={img} shape='circle' size='large' />
                            </div>
                            <div>
                                <InputText className='comment-input' placeholder='Write a comment...' />
                            </div>   
                        </div>
                    </div>
                </Card>
            </div>

            <div>
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
                                <Avatar image={img} shape='circle' size='xlarge' />
                            </div>
                            <div>
                                <span ref={regRefCreator} value={postData.creator} className='profile-name'>Carlton James Jr.</span>
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
                                <FileUpload ref={fileUploadRef} customUpload={true} uploadHandler={uploadImg} multiple accept="image/*" maxFileSize={10000000}
                                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} cancelOptions={cancelOptions} auto />
                            </div>
                        </div>
                        <div className='add-to-post-container'>
                            <div>
                                <Button label='Post' className='p-button-raised post-button' onClick={handleSubmit}/>
                            </div>
                            <div>
                                <Button icon='pi pi-images' className='p-button-success  img-button' onClick={uploadPhoto}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dialog-demo">
                <div className="card">
                    <Dialog header="Header" visible={deleteDialog} style={{ width: '50vw' }} footer={deleteDialogFooter} onHide={onHide}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Dialog>
                </div>
            </div>
        </div>
    )
    
}

export default Post