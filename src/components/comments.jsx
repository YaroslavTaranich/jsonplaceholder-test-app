import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '../css/posts.module.css'
import { getCommetsByPostId } from '../store/commentsSlice'

function Comment({ name, email, body }) {
  return (
    <div className={styles.comment}>
      <header>
        <span>{name}</span>
        <span>
          Mail: <a href={`mailto:${email}`}>{email}</a>
        </span>
      </header>
      <p>{body}</p>
    </div>
  )
}

function Comments({ postId }) {
  const [show, setShow] = useState(false)
  const comments = useSelector(getCommetsByPostId(postId))

  const commentsStyles = [styles.comments]
  commentsStyles.push(show ? styles.show : styles.hide)

  return (
    <>
      <div className={commentsStyles.join(' ')}>
        {comments.map((comment) => (
          <Comment key={comment.name} {...comment} />
        ))}
      </div>
      <button className={styles.showButton} type="button" onClick={() => setShow((s) => !s)}>
        {show ? 'hide' : 'show'} comments
      </button>
    </>
  )
}

export default Comments
