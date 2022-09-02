import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';
import logo from '../img/fakebook_logo.png'

import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'

function Navbar () {

    return(
        <div>
            <div className='navbar'>
                <div>
                    <img alt="logo" src={logo} height="60" className="mr-2"></img>
                </div>
                <div className='navbar-search'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className='navbar-search' placeholder="Search Fakebook" />
                    </span>
                </div>
            </div>
        </div>
    )

    // const items = [
    //     {
    //         template: () => {
    //             return (
    //                 <div className='navbar-search'>
    //                     <span className="p-input-icon-left">
    //                         <i className="pi pi-search" />
    //                         <InputText className='navbar-search' placeholder="Search Fakebook" />
    //                     </span>
    //                 </div>
    //             );
    //         },
    //     },
    // ]

    // const start = <img alt="logo" src={logo} height="40" className="mr-2"></img>;

    // return (
    //     <div>
    //         <div className="navbar">
    //             <Menubar className='menu-bar' model={items} start={start} />
    //         </div>
    //     </div>
    // )
}

export default Navbar