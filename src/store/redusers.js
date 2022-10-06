const ADD_MORE_POSTS = 'ADD_MORE_POSTS'
const SET_ERROR = 'SET_ERROR'
const SET_STATUS = 'SET_STATUS'
const SET_PAGE = 'SET_PAGE'

const initialState = {
  data: [],
  error: null,
  status: 'loading',
  page: 1,
}

// eslint-disable-next-line default-param-last
export const postsReduser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MORE_POSTS:
      return { ...state, data: [...state.data, ...action.payload], error: undefined, status: 'ok' }
    case SET_ERROR:
      return { ...state, error: action.payload, status: 'error' }
    case SET_STATUS:
      return { ...state, status: action.payload }
    case SET_PAGE:
      return { ...state, page: action.payload }
    default:
      return state
  }
}

function getPosts(page) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${page}`)
}

export const addManyPostsAction = (posts) => ({ type: ADD_MORE_POSTS, payload: posts })
export const setLoading = () => ({ type: SET_STATUS, payload: 'loading' })
export const setStatus = (status) => ({ type: SET_STATUS, payload: status })

export const setError = (payload) => ({ type: SET_ERROR, payload })

export const getpostsByPage = (page) =>
  // eslint-disable-next-line func-names
  function (dispatch) {
    dispatch(setLoading())
    getPosts(page)
      .then((res) => res.json())
      .then((posts) => {
        if (posts.length > 0) {
          dispatch(addManyPostsAction(posts))
        } else {
          dispatch(setStatus('all'))
        }
      })
      .catch((e) => dispatch(setError(e.message)))
  }

export const selectPosts = (state) => state.posts

// eslint-disable-next-line default-param-last
export const pageReduser = (state = 1, action) => {
  switch (action.type) {
    case SET_PAGE:
      return action.payload
    default:
      return state
  }
}

export const setPage = (page) => ({ type: SET_PAGE, payload: page })
export const getPage = (state) => state.posts.page
