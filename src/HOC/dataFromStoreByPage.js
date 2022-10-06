/* eslint-disable func-names */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

const dataFromStoreByPage = (Component, action, selector, paramName) =>
  function (props) {
    const params = useParams()
    const { data, error, loading } = useSelector(selector(params[paramName]))
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(action(params[paramName]))
    }, [params])

    return <Component data={data} error={error} loading={loading} {...props} />
  }

export default dataFromStoreByPage
