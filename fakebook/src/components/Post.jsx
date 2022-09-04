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
                <div className='post-container'>
                    <div className='post-avatar-container'>
                        <div>
                            <Avatar image={img} shape='circle' size='xlarge' />
                        </div>
                        <div>
                            <span className='profile-name'>Carlton James Jr.</span>
                            <h4 className='time'></h4>
                        </div>
                    </div>
                    <h2 className='post-body'>I am the greatest of all time. No one is greater than me.</h2>
                    <img className='post-image' src={img} />
                    <div className='like-comment-container'>
                        <i className='pi pi-thumbs-up like-icon' />
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