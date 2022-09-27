import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { pageReduser, postsReduser } from './redusers'

const composedEnhancer = compose(applyMiddleware(thunk), composeWithDevTools())

const rootReduser = combineReducers({ posts: postsReduser, page: pageReduser })

const store = createStore(rootReduser, composedEnhancer)

export default store
