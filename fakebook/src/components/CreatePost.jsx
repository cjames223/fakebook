import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import logo from '../img/fakebook_logo.png'
import img from '../img/profile_img.jpg'

import { InputText } from 'primereact/inputtext'
import { Avatar } from 'primereact/avatar'
import { Card } from 'primereact/card'

function CreatePost () {
    return (
        <div className='create-post-container'>
            <div>
                <Card className='create-post-card'>
                    <div className='create-post'>
                        <Avatar image={img} shape='circle' size='large' />
                        <InputText className='write-post-input' placeholder="What's on your mind?" />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CreatePost