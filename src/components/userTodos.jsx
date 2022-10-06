import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { todoRemove, getTodosData, toggleComplited, getUserTodos } from '../store/TodosSlice'
import styles from '../css/todos.module.css'

import Spinner from './UI/spinner/spinner'

function UserTodos() {
  const { id } = useParams()
  const { allTodos, loading, error } = useSelector(getTodosData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserTodos(id))
  }, [dispatch, id])

  if (loading) return <Spinner />
  if (error) return <h1>ERROR ! ! !</h1>

  return (
    <section className={styles.todos}>
      <ul className={styles.todo_list}>
        {allTodos && allTodos.length === 0 && <div>Nothing it Here!</div>}
        {allTodos.map((todo, i) => (
          <li key={todo.id} className={styles.todo}>
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
    </section>
  )
}

export default UserTodos
