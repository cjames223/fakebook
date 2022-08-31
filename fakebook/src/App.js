import './App.css';
import Login from './screens/login'
import Register from './screens/register'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path ='/' element={<Login />} />
        <Route path ='register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;
