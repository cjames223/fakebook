import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import img from '../img/profile_img.jpg'

import { Card } from 'primereact/card'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

function Post ({ post }) {

    return (
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
                {/* <h1>{post.body}</h1>
                <img src={post.selectedFile} /> */}
            </Card>
        </div>
    )
    
}

export default Post