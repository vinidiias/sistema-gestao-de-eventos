import styles from './Submit.module.css'

const Submit = ({ text, onSubmit, customClass  }) => {
    return <button className={`${styles.btn} ${styles[customClass]}`} onClick={onSubmit}>{text}</button>
}

export default Submit