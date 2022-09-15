import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getPosts } from './actions/posts'
import { getUsers } from './actions/users'
import { getProfiles } from './actions/profiles'
import { getPhotos } from './actions/images'


import Login from './screens/Login'
import Home from './screens/Home'
import Profile from './screens/Profile'
import profiles from './reducers/profiles';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentLocation = window.location.pathname.split('/')
  const currentProfile = currentLocation[2]

  let user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getUsers())
    dispatch(getProfiles())
    dispatch(getPhotos())
  }, [dispatch])

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('profile'))
    if(!user) {
        navigate('/')
    }
}, [navigate])

  return (
    <div className='App'>
      <Routes>
        <Route path ='/' element={!user ? <Login /> : <Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path={`/profile/${currentProfile}`} element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
