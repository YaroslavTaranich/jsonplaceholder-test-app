import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import dataFromStoreByPage from '../HOC/dataFromStoreByPage'
import { getAlbumsByUserId, selcetAlbumsByUserId, selectUserAlbums } from '../store/albumsSlice'
import { getPhotoByManyAlbumsIds } from '../store/photosSlice'
import styles from '../css/albums.module.css'

import AlbumPreview from './AlbumPreview'
import Spinner from './UI/spinner/spinner'

function AlbulsList({ data, loading, error }) {
  const params = useParams()
  const dispatch = useDispatch()
  const albumsIds = useSelector(selectUserAlbums(params.id))

  useEffect(() => {
    if (albumsIds.length > 0) {
      dispatch(getPhotoByManyAlbumsIds(albumsIds))
    }
  }, [albumsIds])

  if (loading) return <Spinner />

  if (error) return <h1> ERROR ! ! ! </h1>

  return (
    <ul className={styles.list}>
      {data &&
        data.map(({ title, id }) => (
          <li key={title} className={styles.album}>
            <h3 className={styles.title}>{title}</h3>
            <AlbumPreview albumId={id} />
          </li>
        ))}
    </ul>
  )
}

export default dataFromStoreByPage(AlbulsList, getAlbumsByUserId, selcetAlbumsByUserId, 'id')
