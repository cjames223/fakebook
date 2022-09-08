import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react'
import { getAllPostContainer } from '../actions/all_post_container'

function Posts () {
    const dispatch = useDispatch()

    let allPosts = useSelector((state) => state.posts)
console.log(allPosts)
    const revPosts = allPosts.slice().reverse()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const [postContainer, setPostContainer] = useState()

    const allPostContainer = useRef()
console.log(allPosts)
    useEffect(() => {
       dispatch(getAllPostContainer(allPostContainer))
    }, [])

    return (
        <div ref={allPostContainer} className='all-post-container'>  
                {revPosts.map((post) => {
                    if(user?.result.sub === post?.creator || user?.result._id === post?.creator) {
                        return (
                            <Post post={post} />
                        )
                    }
                })}
        </div>
    )
    
}

export default Posts