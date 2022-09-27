import { useEffect, useState } from 'react'

const base = 'https://jsonplaceholder.typicode.com/'

function withData(Component, url) {
  // eslint-disable-next-line func-names
  return function (props) {
    const [data, setData] = useState([])
    const [status, setStatus] = useState('start')
    const [error, setError] = useState(undefined)

    useEffect(() => {
      setStatus('loading')
      fetch(`${base + url}?_limit=30`)
        .then((response) => response.json())
        .then((json) => {
          setData(json)
          setStatus('ok')
        })
        .catch((e) => {
          setError(e.message)
          setStatus('error')
        })
    }, [Component, url])

    return <Component data={data} status={status} error={error} {...props} />
  }
}

export default withData
