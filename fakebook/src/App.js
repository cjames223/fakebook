import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getPosts } from './actions/posts'
import { getUsers } from './actions/users'


import Login from './screens/Login'
import Home from './screens/Home'
import Profile from './screens/Profile'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('profile'))
    if(!user) {
        navigate('/')
    }
}, [navigate])

  console.log(user)

  return (
    <div className='App'>
      <Routes>
        <Route path ='/' element={!user ? <Login /> : <Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path={'/profile/:id'} element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App;
