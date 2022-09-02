import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './screens/Login'
import Register from './screens/Register'
import Home from './screens/Home'


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path ='/' element={<Login />} />
        <Route path ='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
