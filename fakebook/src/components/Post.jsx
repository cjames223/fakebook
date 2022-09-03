import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../App.css';

import { useSelector } from 'react-redux'
import { Card } from 'primereact/card'

function Post () {
    const posts = useSelector((state) => state.posts)

    return (
        <div className='post-container'>
            <Card className='post-template'>
                <h1></h1>
            </Card>
        </div>
    )
    
}

export default Post