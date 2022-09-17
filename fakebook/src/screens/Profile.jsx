import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../actions/images';
import Navbar from '../components/Navbar'
import CreatePost from '../components/CreatePost'
import Posts from '../components/Posts'
import Header from '../components/Header'
import PhotoGallery from '../components/PhotoGallery';

function Profile () {

    let images = useSelector((state) => state.images)
    console.log(images)


    return (
        <div>
            <div>
                <Navbar />
                <Header />
                <CreatePost />
                <PhotoGallery images={images} />
                <Posts />
            </div>
        </div>
    )
}

export default Profile