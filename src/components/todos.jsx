import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  getTodosByPage,
  todoAddOne,
  todoRemove,
  todoNextPage,
  todoPrevPage,
  getTodosData,
  toggleComplited,
} from '../store/TodosSlice'
import { getAllIdsEntities } from '../store/usersSlice'
import styles from '../css/todos.module.css'

import Spinner from './UI/spinner/spinner'

function Todos() {
  const [input, setInput] = useState('')
  const { allTodos, page, loading, error } = useSelector(getTodosData)
  const { userEntites } = useSelector(getAllIdsEntities)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodosByPage(page))
  }, [dispatch, page])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      todoAddOne({
        userId: null,
        id: Math.random(),
        title: input,
        completed: false,
      })
    )
    setInput('')
  }

  if (loading) return <Spinner />
  if (error) return <h1>ERROR ! ! !</h1>

  return (
    <section className={styles.todos}>
      <form onSubmit={onSubmit} className={styles.add_todo}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} required />
        <button type="submit">ADD TODO</button>
      </form>
      <ul className={styles.todo_list}>
        {allTodos && allTodos.length === 0 && <div>Nothing it Here!</div>}
        {allTodos.map((todo, i) => (
          <li key={todo.id} className={styles.todo}>
            <div className={styles.authtor}>
              <img
                className={styles.avatar}
                src={`https://avatars.dicebear.com/api/gridy/${
                  userEntites[todo.userId] ? userEntites[todo.userId].username : 'unknown'
                }.svg`}
                alt=""
              />

              {userEntites[todo.userId] ? (
                <Link to={`/users/${todo.userId}`} className={styles.username}>
                  {userEntites[todo.userId].username}
                </Link>
              ) : (
                <span className={styles.username}>unknown</span>
              )}
            </div>
            <label htmlFor={todo.title} className={todo.completed && styles.complited}>
              <input
                id={todo.title}
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplited(todo.id))}
              />
              {i + 1}. {todo.title}{' '}
            </label>
            <button type="button" onClick={() => dispatch(todoRemove(todo.id))}>
              delete
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {page > 1 && (
          <button type="button" onClick={() => dispatch(todoPrevPage())} disabled={loading} className={styles.prev}>
            PREV PAGE
          </button>
        )}
        {allTodos && allTodos.length !== 0 && (
          <button type="button" onClick={() => dispatch(todoNextPage())} disabled={loading} className={styles.next}>
            NEXT PAGE
          </button>
        )}
      </div>
    </section>
  )
}

export default Todos
