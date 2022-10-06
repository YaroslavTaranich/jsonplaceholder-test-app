import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postsInfo, setNextPage, clearPosts } from '../store/postsSlice'
import styles from '../css/posts.module.css'

import Post from './post'
import Spinner from './UI/spinner/spinner'

function Posts({ selector, actionCreator, parent }) {
  const { fetchStatus, loadBy, error, page } = useSelector(postsInfo)
  const allPosts = useSelector(selector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearPosts(parent))
  }, [])

  useEffect(() => {
    if (loadBy === parent) dispatch(actionCreator(page))
  }, [page, loadBy, parent])

  if (allPosts.length === 0 && fetchStatus === 'loading') return <Spinner />
  if (error) return <h1> ERROR! {error}</h1>

  return (
    <section className={styles.section}>
      <ul className={styles.posts}>
        {allPosts &&
          allPosts.map((post) => (
            <li className={styles.posts_elem} key={post.id}>
              <Post {...post} />
            </li>
          ))}
      </ul>
      {fetchStatus === 'loading' && <Spinner />}
      {fetchStatus !== 'all' && (
        <button className={styles.button} type="button" onClick={() => dispatch(setNextPage())}>
          LOAD MORE POSTS
        </button>
      )}
      {fetchStatus === 'all' && <div className={styles.finish}>ALL POSTS LOADED!</div>}
    </section>
  )
}

Posts.defaultPorps = {
  parent: 'posts',
}

export default Posts
