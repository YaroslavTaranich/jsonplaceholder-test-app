import styles from './spinner.module.scss'

function Spinner() {
  return (
    <div className={styles.l}>
      <div className={styles.loader}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default Spinner
