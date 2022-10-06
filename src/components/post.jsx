import styles from '../css/posts.module.css'

import Comments from './comments'
import UserInfo from './userInfo'

function Post({ userId, id, title, body }) {
  return (
    <div className={styles.post}>
      <UserInfo userId={userId} />
      <h2 className={styles.title}>
        {id}. {title}
      </h2>
      <p className={styles.pots_body}>{body}</p>
      <Comments postId={id} />
    </div>
  )
}

export default Post
