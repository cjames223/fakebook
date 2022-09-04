import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import Post from './Post'
import { useSelector } from 'react-redux'

function Posts () {
    const posts = useSelector((state) => state.posts)

    console.log(posts)

    return (
        <div className='post-container'>
                {posts.map((post) => (
                    <Post post={post} />
                ))}
        </div>
    )
    
}

export default Posts