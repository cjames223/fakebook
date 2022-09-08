import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import Navbar from '../components/Navbar'
import CreatePost from '../components/CreatePost'
import Posts from '../components/Posts'
import Header from '../components/Header'
import PhotoGallery from '../components/PhotoGallery';

function Profile () {
    return (
        <div>
            <div>
                <Navbar />
                <Header />
                <CreatePost />
                <PhotoGallery />
                <Posts />
            </div>
        </div>
    )
}

export default Profile