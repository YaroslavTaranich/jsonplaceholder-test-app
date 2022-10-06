import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '../css/albums.module.css'
import { selcetPhotosByAlbumId } from '../store/photosSlice'

function AlbumPreview({ albumId }) {
  const { data, loading, error } = useSelector(selcetPhotosByAlbumId(albumId))
  const [show, setShow] = useState(false)
  if (loading) return <span>loading...</span>
  if (error) return <span>{error}</span>

  const previewClass = [styles.preview]
  if (show) {
    previewClass.push(styles.show)
  }

  return (
    <div className={styles.photos}>
      <div className={previewClass.join(' ')}>
        {data && data.map((photo) => <img src={photo.thumbnailUrl} alt={photo.title} />)}
      </div>
      <button type="button" className={styles.button} onClick={() => setShow((s) => !s)}>
        {show ? 'HIDE PHOTOS' : 'SHOW MORE PHOTOS'}
      </button>
    </div>
  )
}

export default AlbumPreview
