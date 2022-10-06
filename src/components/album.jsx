import { useState } from 'react'
import { useSelector } from 'react-redux'

import { selcetPhotosByAlbumId } from '../store/photosSlice'
import styles from '../css/albums.module.css'

import Spinner from './UI/spinner/spinner'

function Album({ albumId }) {
  const [current, setCurrent] = useState(0)
  const { data: photos, loading, error } = useSelector(selcetPhotosByAlbumId(albumId))
  if (loading) return <Spinner />
  if (error) return <span>ERROR ! ! !</span>

  const nextPhoto = () => {
    setCurrent((c) => (c < photos.length - 1 ? c + 1 : 0))
  }
  const prevPhoto = () => {
    setCurrent((c) => (c > 1 ? c - 1 : photos.length - 1))
  }

  return (
    <div>
      {photos[current] && (
        <div className={styles.galery}>
          <div className={styles.photo}>
            <button type="button" className={styles.controls} onClick={prevPhoto}>
              &#60;
            </button>
            <img src={photos[current].url} alt={photos[current].title} />
            <button type="button" className={styles.controls} onClick={nextPhoto}>
              &#62;
            </button>
          </div>
          <p>{photos[current].title}</p>
        </div>
      )}

      <div className={`${styles.full}`}>
        {photos &&
          photos.map((photo, id) => (
            <button type="button" onClick={() => setCurrent(id)} className={styles.img_button} key={photo.title}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </button>
          ))}
      </div>
    </div>
  )
}

export default Album
