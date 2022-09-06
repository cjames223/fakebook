import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import Post from './Post'
import { useSelector } from 'react-redux'

function Posts () {
    const allPosts = useSelector((state) => state.posts)

    return (
        <div className='all-post-container'>
                {allPosts.map((post) => (
                    <Post post={post} />
                ))}
        </div>
    )
    
}

export default Posts