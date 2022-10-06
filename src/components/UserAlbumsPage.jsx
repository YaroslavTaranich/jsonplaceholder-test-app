import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import dataFromStoreByPage from '../HOC/dataFromStoreByPage'
import { getAlbumsByUserId, selcetAlbumsByUserId, selectUserAlbums } from '../store/albumsSlice'
import { getPhotoByManyAlbumsIds } from '../store/photosSlice'
import styles from '../css/albums.module.css'

import Spinner from './UI/spinner/spinner'
import Album from './album'

function UserAlbums({ data, loading, error }) {
  const params = useParams()
  const dispatch = useDispatch()
  const userAlbumsIds = useSelector(selectUserAlbums(params.id))

  useEffect(() => {
    if (userAlbumsIds.length > 0) dispatch(getPhotoByManyAlbumsIds(userAlbumsIds))
  }, [userAlbumsIds])

  if (error) return <h1>{error}</h1>
  if (loading) return <Spinner />
  return (
    <section className={styles.user_albums}>
      {data &&
        data.map((album) => (
          <div key={album.title}>
            <h2 className={styles.album_title}>{album.title}</h2>
            <Album title={album.title} albumId={album.id} />
          </div>
        ))}
    </section>
  )
}

export default dataFromStoreByPage(UserAlbums, getAlbumsByUserId, selcetAlbumsByUserId, 'id')
