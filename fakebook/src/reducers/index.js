import { combineReducers } from 'redux'

import posts from './posts.js'
import auth from './login.js'
import users from './users.js'
import profiles from './profiles.js'
import images from './images.js'
import ref_all_post_container from './all_post_container.js'
import ref_create_post_container from './create_post_container.js'
import ref_photo_container_card from './photo_container_card.js'

export default combineReducers({ posts, auth, users, ref_all_post_container, ref_create_post_container, ref_photo_container_card, profiles, images })