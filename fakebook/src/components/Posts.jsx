import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import Post from './Post'
import { useSelector } from 'react-redux'
import { Card } from 'primereact/card'

function Posts () {
    const posts = useSelector((state) => state.posts)

    return (
        <div className='post-container'>
            <Card className='post-template'>
                {posts.map((post) => (
                    <Post post={post} />
                ))}
            </Card>
        </div>
    )
    
}

export default Posts