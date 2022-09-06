import { combineReducers } from 'redux'

import posts from './posts.js'
import auth from './login'

export default combineReducers({ posts, auth })