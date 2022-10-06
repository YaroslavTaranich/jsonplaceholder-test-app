import withData from '../HOC/withData'

import Spinner from './UI/spinner/spinner'

function Images({ data, status, error }) {
  if (status === 'error') return <h1> ERROR! {error}</h1>
  if (status === 'loading') return <Spinner />

  return (
    <section className="images">
      {data.map((image) => (
        <div className="img-elem" key={image.id}>
          <img alt={image.title} src={image.url} />
          <p>{image.title}</p>
        </div>
      ))}
    </section>
  )
}

export default withData(Images, 'photos')
