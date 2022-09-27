import { useDispatch, useSelector } from 'react-redux'

import withRedux from '../HOC/withRedux'
import { selectPosts, getpostsByPage, getPage, setPage } from '../store/redusers'

function Posts({ data, status, error }) {
  const page = useSelector(getPage)
  const dispatch = useDispatch()
  if (status === 'error') return <h1> ERROR! {error}</h1>
  //   if (status === 'loading') return <h1>LOADING!</h1>
  return (
    <section>
      <ul className="posts">
        {data.map((post) => (
          <li className="post-elem" key={post.id}>
            {post.id}. {post.title}
            <p> {post.body}</p>
          </li>
        ))}
      </ul>
      {status === 'loading' && <h1>LOADING!</h1>}
      {status !== 'all' && (
        <button type="button" onClick={() => dispatch(setPage(page + 1))}>
          LOAD MORE POSTS
        </button>
      )}
      {status === 'all' && <div>ALL LOADED! FINE</div>}
    </section>
  )
}

export default withRedux(Posts, getpostsByPage, getPage, selectPosts)
