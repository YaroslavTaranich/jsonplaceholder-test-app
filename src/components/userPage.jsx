import { useNavigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { getUserById } from '../store/usersSlice'
import { getPostsByUserId, postsSelectpors } from '../store/postsSlice'
import styles from '../css/users.module.css'

import AllUserInfo from './allUserIfo'
import Posts from './posts'
import AlbulsList from './albums'
import Spinner from './UI/spinner/spinner'
import UserTodos from './userTodos'

function UserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(getUserById(id))
  const [showPosts, setShowPosts] = useState(false)
  const [showAlbums, setShowAlbums] = useState(false)
  const [showTodos, setShowTodos] = useState(false)

  const actionCreator = (page) => getPostsByUserId({ page, userId: id })

  if (!user) return <Spinner />

  return (
    <section className={styles.users}>
      <div className={styles.user_info}>
        <AllUserInfo user={user} />
      </div>
      <div className={styles.info}>
        <header>
          <h2 className={styles.info_title}>{user.username} Posts</h2>
          <button className={styles.showInfo} type="button" onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? 'HIDE' : 'SHOW'}
          </button>
        </header>

        {showPosts && (
          <Posts selector={postsSelectpors.selectAll} actionCreator={actionCreator} parent={`user-${id}`} />
        )}
      </div>

      <div className={styles.info}>
        <header>
          <h2 className={styles.info_title}>{user.username} Albums</h2>
          <button className={styles.showInfo} type="button" onClick={() => setShowAlbums((s) => !s)}>
            {showAlbums ? 'HIDE' : 'SHOW'}
          </button>
          <button className={styles.page_button} type="button" onClick={() => navigate(`/users/${id}/albums`)}>
            TO ALBUMS
          </button>
        </header>

        {showAlbums && <AlbulsList />}
      </div>

      <div className={styles.info}>
        <header>
          <h2 className={styles.info_title}>{user.username} Todos</h2>
          <button className={styles.showInfo} type="button" onClick={() => setShowTodos((s) => !s)}>
            {showTodos ? 'HIDE' : 'SHOW'}
          </button>
        </header>

        {showTodos && <UserTodos />}
      </div>
    </section>
  )
}

export default UserPage
