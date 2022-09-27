/* eslint-disable func-names */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const withRedux = (Component, action, paramSelector, selector) =>
  function (props) {
    const paramInStore = useSelector(paramSelector)
    const { data, error, status } = useSelector(selector)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(action(paramInStore))
    }, [paramInStore])

    return <Component data={data} error={error} status={status} {...props} />
  }

export default withRedux
