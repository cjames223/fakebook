import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import logo from '../img/fakebook_logo.png'
import img from '../img/profile_img.jpg'

import { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import { LOGOUT } from '../constants/actionTypes';
import { useNavigate } from 'react-router-dom';


function Navbar () {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    console.log(user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const menu = useRef()

    const fullName = user.result.name
    const picture = user.result.picture
    const avatar_placeholder = `${user.result.given_name.charAt(0).toUpperCase()}${user.result.family_name.charAt(0).toUpperCase()}`

    let items = [
        {label: fullName, icon: <Avatar shape='circle' size='small' className='navbar-avatar' image={picture} imageAlt={avatar_placeholder} />},
        {label: 'Log Out', icon: 'pi pi-sign-out', command: () => {
            logout()
        }}
    ]

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        navigate('/')

        setUser(null)
    }

    return(
        <div className='navbar-container'>
            <div className='navbar'>
                <div>
                    <img alt="logo" src={logo} height="60" className="mr-2"></img>
                </div>
                <div className='navbar-search-container'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='navbar-search' placeholder="Search Fakebook" />
                    </span>
                </div>
                <div>
                    <Menu model={items} popup ref={menu} />
                    <Avatar  image={picture} imageAlt={avatar_placeholder} shape='circle' size='xlarge' className='navbar-avatar' onClick={(event) => menu.current.toggle(event)}/>
                </div>
            </div>
        </div>
    )
}

export default Navbar