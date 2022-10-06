import { useNavigate } from 'react-router'

function ErrorPage() {
  const navigate = useNavigate()
  return (
    <section className="error_page">
      <h1>404</h1>
      <p>There is no such page!</p>
      <button type="button" onClick={() => navigate(-1)}>
        Go back!
      </button>
    </section>
  )
}

export default ErrorPage
